<?php

use App\Http\Controllers\TodoListController;
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

Route::middleware(['api', 'throttle:200,1'])->group(function () {

    Route::get('/todo-lists', [TodoListController::class, 'index'])->name('todo-lists.index');
    Route::post('/todo-lists', [TodoListController::class, 'store'])->name('todo-lists.store');
    Route::put('/todo-lists/{todoList}', [TodoListController::class, 'update'])->name('todo-lists.update');
    Route::delete('/todo-lists/{todoList}', [TodoListController::class, 'destroy'])->name('todo-lists.destroy');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
