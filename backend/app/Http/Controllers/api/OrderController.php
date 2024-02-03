<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\order;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use Carbon\Carbon;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    use ApiResponse;
    public function index()
    {
        try {
            $orders = Order::with('vehicle', 'user')->orderBy('order_id', 'asc')->get();
            $response = $orders->map(function ($item) {
                $item->approval = $item->approval->map(function ($item) {
                    $item->user;
                    return $item;
                });
                return $item;
            });

            return $this->apiSuccess($response, Response::HTTP_OK);
        } catch (\Throwable $e) {
            return $this->apiError(
                $e->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        } 
    }

    public function reportOrderByRangeDate(Request $request)
    {
        try {
            $startDate = Carbon::parse($request->start_date);
            $endDate = Carbon::parse($request->end_date);
            $orders = Order::with('vehicle', 'user')->whereBetween('order_date', [$startDate, $endDate])->get();
            $response = $orders->map(function ($item) {
                $item->approval = $item->approval->map(function ($item) {
                    $item->user;
                    return $item;
                });
                return $item;
            });

            return $this->apiSuccess($response, Response::HTTP_OK);
        } catch (\Throwable $e) {
            return $this->apiError(
                $e->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function reportApprovedOrders(Request $request)
    {
        try {
            $response = Order::selectRaw('DATE(order_date) as date, count(*) as total')
            ->where('approval_status', 'approved')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

            return $this->apiSuccess($response, Response::HTTP_OK);
        } catch (\Throwable $e) {
            return $this->apiError(
                $e->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function reportVehicleOrders()
    {
        try {
            $response = Order::selectRaw('vehicles.name as name, count(*) as total')
                ->join('vehicles', 'vehicles.id', '=', 'orders.vehicle_id')
                ->groupBy('name')
                ->orderBy('name', 'asc')
                ->get();

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
                'vehicle_id' => 'required',
                'employee_name' => 'required',
                'driver_name' => 'required',
                'information' => 'required'
            ]);
            $latest = Order::orderBy('order_id', 'DESC')->first();
            $id_number = $latest ? (int)substr($latest->order_id, 6) + 1 : 1;
            $id = 'TRX' . str_pad($id_number, 4, '0', STR_PAD_LEFT);

            Order::create([
                'order_id' => $id,
                'user_id' => Auth::user()->id,
                'vehicle_id' => $validated['vehicle_id'],
                'employee_name' => $validated['employee_name'],
                'driver_name' => $validated['driver_name'],
                'order_date' => Carbon::now(),
                'date_of_return' => NULL,
                'approval_status' => 'pending',
                'rent_status' => '-',
                'information' => $validated['information']
            ]);

            $response = Order::with('vehicle', 'user')->where('order_id', $id)->first();

            return $this->apiSuccess($response, Response::HTTP_CREATED);
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
            $response = Order::find($id);
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

    // update returned date
    public function updateReturnedDate($id)
    {
        try {
            $response = Order::find($id);
            if ($response == null) {
                return $this->apiError(
                    'Data not found',
                    Response::HTTP_NOT_FOUND
                );
            }

            $response->update([
                'date_of_return' => Carbon::now(),
                'loan_status' => 'returned'
            ]);

            return $this->apiSuccess($response, Response::HTTP_OK);
        } catch (\Throwable $e) {
            return $this->apiError(
                $e->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

    }

    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validated();
            $response = Order::find($id);
            if ($response == null) {
                return $this->apiError(
                    'Data not found',
                    Response::HTTP_NOT_FOUND
                );
            }
            $response->update($validated);
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
            $response = Order::find($id);
            if($response == null){
                return $this->apiError(
                    'Data not found',
                    Response::HTTP_NOT_FOUND
                );
            }
            $response->delete();
            return $this->apiSuccess($response, Response::HTTP_OK);
        } catch(\Throwable $e){
            return $this->apiError(
                $e->getMessage(),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
