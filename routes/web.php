<?php

use App\Mail\portfolio;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;

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

Route::post('/email', function (Request $request) {
    $rules = [
        'name' => 'required',
        'email' => 'required|email',
        'message' => 'required',
        'context' => 'required',
    ];

    $validator = Validator::make($request->all(), $rules);

    if ($validator->fails()) {
        // Se a validação passar, continue o processo
        $nome = $request->name;
        $email = $request->email;
        $mensagem = $request->message;
        $context = $request->context;

        $message = new portfolio($nome, $email, $mensagem, $context);
        $message->to('rafael.leite.14@hotmail.com');

        Mail::send($message);
        Session::flash('message', $validator->errors());

        return redirect('/home#contato');
    } else {
        // Se a validação passar, continue o processo
        $nome = $request->name;
        $email = $request->email;
        $mensagem = $request->message;
        $context = $request->context;

        $message = new portfolio($nome, $email, $mensagem, $context);
        $message->to('rafael.leite.14@hotmail.com');

        Mail::send($message);
        Session::flash('message', 'Sua mensagem foi enviada, obrigado por entrar em contato!');

        return redirect('/home#contato');
    }


})->name('email');

// Route::get('/construction', function () {
//     return view('construction');
// })->name('underconstruction');