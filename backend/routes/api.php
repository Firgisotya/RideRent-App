<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ApprovalController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::prefix('/auth')->group(function(){
    Route::post('/register', [AuthController::class, 'Register']);
    Route::post('/login', [AuthController::class, 'Login']);

});

Route::middleware('auth:sanctum')->group(function(){
    Route::prefix('/auth')->group(function(){
        Route::post('/logout', [AuthController::class, 'Logout']);
    });

    Route::apiResource('/users', UserController::class);
    Route::apiResource('/roles', RoleController::class);
    Route::apiResource('/vehicles', VehicleController::class);  

});


