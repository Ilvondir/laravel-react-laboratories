<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "login"]);

Route::middleware("auth:sanctum")->group(function() {
    Route::get("/user", [AuthController::class, "user"]);
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::put("/users/info", [AuthController::class, "updateInfo"]);
    Route::put("/users/password", [AuthController::class, "updatePassword"]);

    Route::apiResource("/users", UserController::class);

    Route::get("/permissions", [PermissionController::class, "index"]);
    Route::apiResource("/roles", RoleController::class);

    Route::apiResource("/products", ProductController::class);

    Route::post("/upload", [ImageController::class, "upload"]);

    Route::apiResource("/orders", OrderController::class)->only("index", "show");
    Route::post("/export", [OrderController::class, "export"]);

    Route::get("/chart", [OrderController::class, "chart"]);
});
