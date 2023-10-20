<?php

use App\Mail\portfolio;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\{WebsiteController, GithubController};

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

Route::prefix('github')->name('github/')->group(function () {
    Route::post('/user', [GithubController::class, 'user'])->name('user');
    Route::get('/repos/{user}/languages', [GithubController::class, 'languages'])->name('owner/repos/languages');
    Route::get('/repos/{user}/{repo}', [GithubController::class, 'repo'])->name('owner/repo');
    Route::get('/repo/{user}/{repo}/deployments', [GithubController::class, 'deployments'])->name('owner/repo/deployments');
});

// Route::get('/construction', function () {
//     return view('construction');
// })->name('underconstruction');