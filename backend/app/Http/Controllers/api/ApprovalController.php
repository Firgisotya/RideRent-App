<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\approval;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Carbon\Carbon;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ApprovalController extends Controller
{
    use ApiResponse;
    public function index()
    {
        try {
            $response = Approval::with('user', 'order')->orderBy('id', 'asc')->get();
            return $this->apiSuccess($response, Response::HTTP_OK);
        } catch (\Throwable $e) {
            return $this->apiError(
                $e->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'order_id' => 'required',
                'user_id' => 'required',
                'level' => 'required'
            ]);
            // check level is exist by order id
            $checkLevel = Approval::where('order_id', $validated['order_id'])
                ->where('level', $validated['level'])
                ->first();
            if ($checkLevel != null) {
                return $this->apiError(
                    'Level ' . $validated['level'] . ' is already exist!',
                    Response::HTTP_UNPROCESSABLE_ENTITY
                );
            }

            // if level is 1, then set status to pending but if level is not 1, then set status to waiting
            $status = 'waiting';
            if ($validated['level'] == 1) {
                $status = 'pending';
            }

            $response = Approval::create([
                'order_id' => $validated['order_id'],
                'user_id' => $validated['user_id'],
                'status' => $status,
                'level' => $validated['level']
            ]);
            return $this->apiSuccess($response, Response::HTTP_CREATED);
        } catch (\Throwable $e) {
            return $this->apiError(
                $e->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

     // show approval by order id
     public function showByOrderId($id)
     {
         try {
             $response = Approval::with(['order', 'user'])->where('order_id', $id)->orderBy('level', 'asc')->get();
             return $this->apiSuccess($response, Response::HTTP_OK);
         } catch (\Throwable $e) {
             return $this->apiError(
                 $e->getMessage(),
                 Response::HTTP_INTERNAL_SERVER_ERROR
             );
         }
     }
 
     // show by user id
     public function showByUserId()
     {
         try {

            if (Auth::user()->role_id == 2) {
                $response = Approval::with(['order', 'user'])->where('level', 1)->orderBy('level', 'asc')->get();
                return $this->apiSuccess($response, Response::HTTP_OK);
            } else if (Auth::user()->role_id == 3) {
                $response = Approval::with(['order', 'user'])->where('level', 2)->orderBy('level', 'asc')->get();
                return $this->apiSuccess($response, Response::HTTP_OK);
            } else if (Auth::user()->role_id == 4) {
                $response = Approval::with(['order', 'user'])->where('level', 3)->orderBy('level', 'asc')->get();
                return $this->apiSuccess($response, Response::HTTP_OK);
            }
         } catch (\Throwable $e) {
             return $this->apiError(
                 $e->getMessage(),
                 Response::HTTP_INTERNAL_SERVER_ERROR
             );
         }
 
     }
 
     public function show($id)
     {
         try {
             $response = Approval::find($id);
             if ($response == null) {
                 return $this->apiError(
                     'Data not found',
                     Response::HTTP_NOT_FOUND
                 );
             }
             return $this->apiSuccess($response);
         } catch (\Throwable $e) {
             return $this->apiError(
                 $e->getMessage(),
                 Response::HTTP_INTERNAL_SERVER_ERROR
             );
         }
     }
 
     // approve
     public function approve($id){
         try {
             $response = Approval::find($id);
             if ($response == null) {
                 return $this->apiError(
                     'Data not found',
                     Response::HTTP_NOT_FOUND
                 );
             }
 
             $response->update([
                 'approval_date' => Carbon::now(),
                 'status' => 'approved',
             ]);
 
             // update next level approval
             $nextLevel = $response->level + 1;
             $nextApproval = Approval::where('order_id', $response->order_id)
                 ->where('level', $nextLevel)
                 ->first();
             if ($nextApproval != null) {
                 $nextApproval->update([
                     'status' => 'pending'
                 ]);
             }
 
             // update approvals status in order when all approval is approved
             $approvals = Approval::where('order_id', $response->order_id)->get();
             $approvalsStatus = $approvals->pluck('status');
             if ($approvalsStatus->contains('pending') == false) {
                 $order = $response->order;
                 $order->update([
                     'approval_status' => 'approved',
                     'loan_status' => 'being borrowed'
                 ]);
             }
 
             return $this->apiSuccess($response, Response::HTTP_OK);
         } catch (\Throwable $e) {
             return $this->apiError(
                 $e->getMessage(),
                 Response::HTTP_INTERNAL_SERVER_ERROR
             );
         }
     }
 
     public function reject($id){
         try {
             $response = Approval::find($id);
             if ($response == null) {
                 return $this->apiError(
                     'Data not found',
                     Response::HTTP_NOT_FOUND
                 );
             }
 
             $response->update([
                 'approval_date' => Carbon::now(),
                 'status' => 'rejected',
             ]);
 
             // update approvals status in order when all approval is rejected
             $approvals = Approval::where('order_id', $response->order_id)->get();
             $approvalsStatus = $approvals->pluck('status');
             if ($approvalsStatus->contains('rejected') == true) {
                 $order = $response->order;
                 $order->update([
                     'approval_status' => 'rejected'
                 ]);
             }
 
             return $this->apiSuccess($response, Response::HTTP_OK);
         } catch (\Throwable $e) {
             return $this->apiError(
                 $e->getMessage(),
                 Response::HTTP_INTERNAL_SERVER_ERROR
             );
 
         }
     }
 
     public function destroy($id){
         try{
             $response = Approval::find($id);
             if($response == null){
                 return $this->apiError(
                     'Data not found',
                     Response::HTTP_NOT_FOUND
                 );
             }
             $response->delete();
             return $this->apiSuccess($response, Response::HTTP_OK);
         }catch(\Throwable $e){
             return $this->apiError(
                 $e->getMessage(),
                 Response::HTTP_INTERNAL_SERVER_ERROR
             );
         }
     }
}
