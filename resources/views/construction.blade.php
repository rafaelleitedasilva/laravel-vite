@extends('layouts.master')
@section('content')
<style>
    body{
        width: 100vw;
        height: 100vh;
        background-color: black;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url('https://i.pinimg.com/originals/18/2c/38/182c3877f717f3ecbbf379e36699aa0e.gif');
    }

    .background-maintence{
        width: 100vw;
        height: 100vh;
        margin: 0;
        background: rgba(255, 255, 255, 0); /* Cor de fundo com transparência */
        backdrop-filter: blur(10px); /* Aplica um desfoque para criar o efeito de vidro */
    }

    footer {
        position: fixed;
        bottom: 0;
        right: 0;
        padding: 10px; /* Espaçamento interno do footer */
        padding-bottom: 0px;
    }
</style>
<div class="d-flex justify-content-center align-items-center background-maintence flex-wrap">
    <div class="text-center">
        <h1 class="text-white">
            Site em Construção
        </h1>
        <h4 class="text-white">
            novidades em breve...
        </h4>
    </div>
</div>
<footer class="fi">
    <p class="text-white"> © 2023 Rafael Leite da Silva. </p>
</footer>
@endsection