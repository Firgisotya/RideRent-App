<?php



use App\Http\Controllers\api\ApprovalController;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\OrderController;
use App\Http\Controllers\api\RoleController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\VehicleController;
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
    Route::apiResource('/orders', OrderController::class);
    Route::get('/orders/reports/approved-orders', [OrderController::class, 'reportApprovedOrders']);
    Route::get('/orders/reports/vehicle-orders', [OrderController::class, 'reportVehicleOrders']);
    Route::get('/orders/{order_id}/returned', [OrderController::class, 'updateReturnedDate']);
    Route::post('/orders/reports/orders-by-range-date', [OrderController::class, 'reportOrderByRangeDate']);
    Route::prefix('/approvals')->group(function(){
        Route::get('/', [ApprovalController::class, 'index']);
        Route::post('/', [ApprovalController::class, 'store']);
        Route::get('/{id}', [ApprovalController::class, 'show']);
        Route::get('/{id}/approve', [ApprovalController::class, 'approve']);
        Route::get('/{id}/reject', [ApprovalController::class, 'reject']);
        Route::get('/order/{id}', [ApprovalController::class, 'showByOrderId']);
        Route::get('/by/user', [ApprovalController::class, 'showByUserId']);
        Route::delete('/{id}', [ApprovalController::class, 'destroy']);
    });  

});


