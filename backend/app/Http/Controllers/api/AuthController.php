<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Traits\ApiResponse;

class AuthController extends Controller
{
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

    public function Login(Request $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            if(!$user){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Email tidak terdaftar'
                ]);
            }
            if(!Hash::check($request->password, $user->password)){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Password salah'
                ]);
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
                $e->getMessage(),
                Response::HTTP_UNAUTHORIZED
            ));
        }
    }

    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json([
                'status' => 'success',
                'message' => 'Logout berhasil'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage()
            ]);
        }
    }


}
