<?php

namespace App\Http\Controllers;

use App\Mail\portfolio;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Mail, Validator};

class WebsiteController extends Controller
{
    public function email(Request $request)
    {
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
    }
}