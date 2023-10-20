<?php

use App\Mail\portfolio;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\WebsiteController;

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

Route::get('/home', [WebsiteController::class, 'index'])->name('home');

Route::get('status', function () {
    return redirect('https://stats.uptimerobot.com/MPxZMuxkYQ');
})->name('status');

Route::post('/email', [WebsiteController::class, 'email'])->name('email');

// Route::get('/construction', function () {
//     return view('construction');
// })->name('underconstruction');