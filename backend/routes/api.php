<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\AdminAvailabilityController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminAuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::get('/availabilities/{date}', [AvailabilityController::class, 'getByDate']);
Route::post('/book', [BookingController::class, 'store']);

Route::post('/admin/login', [AdminAuthController::class, 'login']);



Route::middleware('auth:api')->group(function () {
Route::post('/admin/availabilities', [AdminAvailabilityController::class, 'store']);  // Create
Route::put('/admin/availabilities/{id}', [AdminAvailabilityController::class, 'update']);  // Update
Route::delete('/admin/availabilities/{id}', [AdminAvailabilityController::class, 'destroy']);  // Delete

Route::get('/admin/availabilities', [AdminAvailabilityController::class, 'getAvailabilities']);
});