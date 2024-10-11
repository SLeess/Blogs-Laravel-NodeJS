<?php

use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\TempImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::apiResource("/blog", BlogController::class, [
    "parameters" => ["blog" => "data"],
    // "except" => ["index"]
]);

Route::post('save-temp-image', [TempImageController:: class, "store"])->name("image.store");
