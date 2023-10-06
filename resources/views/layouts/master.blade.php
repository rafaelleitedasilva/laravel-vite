<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
        <title>Rafael L. Silva</title>
        <link rel="shortcut icon" href="{{ Vite::asset('resources/favicon/favicon.ico') }}" type="image/x-icon">
        
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
 
        @vite([
            'resources/css/app.css', 
            'resources/scss/style.scss',
            'resources/js/app.js'])
    </head>
    <body>
        {{-- <div id="preloader-active">
            <div class="preloader d-flex align-items-center justify-content-center">
                <div class="preloader-inner position-relative">
                    <div class="preloader-circle"></div>
                    <div class="preloader-img pere-text">
                        <img src="assets/img/logo/loder.png" alt="">
                    </div>
                </div>
            </div>
        </div> --}}
        
        @extends('layouts.header')
        @yield('content')

        @extends('layouts.footer')
        
    </body>
    @yield('scripts')

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6866574806883069"
     crossorigin="anonymous"></script>
</html>