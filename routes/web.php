<?php

use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect()->route('home');
});

Route::get('/home', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::post('/email', [\App\Http\Controllers\HomeController::class, 'email'])->name('email');

Route::get('/{route}', function () {
    return redirect()->route('home');
});
// Route::get('/construction', function () {
//     return view('construction');
// })->name('underconstruction');
