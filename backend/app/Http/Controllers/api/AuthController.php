<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Traits\ApiResponse;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    use ApiResponse;
    public function Register(Request $request)
    {
       try {
        $cekEmail = User::where('email', $request->email)->first();
        if($cekEmail){
            return response()->json([
                'status' => 'error',
                'message' => 'Email sudah terdaftar'
            ]);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => 2
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User berhasil ditambahkan',
            'data' => $user
        ]);
    
       } catch (\Throwable $th) {
        throw new HttpResponseException($this->apiResponse($th->getMessage(), 500));
       }
    }

    public function Login(LoginRequest $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            if(!$user){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email tidak terdaftar'
                ], 401);
            }
            if(!Hash::check($request->password, $user->password)){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Password salah'
                ], 401);
            }
            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'status' => 'success',
                'message' => 'Login berhasil',
                'data' => $user,
                'token' => $token
            ]);
        } catch (\Throwable $th) {
            throw new HttpResponseException($this->apiError(
                $th->getMessage(),
                Response::HTTP_UNAUTHORIZED
            ));
        }
    }

    public function logout(RegisterRequest $request)
    {
        try {
            $request->user()->tokens()->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Logout berhasil'
            ]);
        } catch (\Throwable $th) {
            throw new HttpResponseException($this->apiError(
                $th->getMessage(),
                Response::HTTP_UNAUTHORIZED
            ));
        }
    }


}
