@extends('layouts.master')
@section('content')
    <main>

        <div class="slider-area">
            <div class="single-slider slider-height d-flex align-items-center background-blur">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-xl-12 col-lg-10 col-md-10 col-sm-10">
                            <!-- Hero Caption -->
                            <div class="hero__caption">
                                <h1>Rafael.</h1>
                                <p>Desenvolvedor Fullstack:</p>
                                <div class="d-flex justify-content-end">
                                    <p class="cd-headline letters scale">
                                        <a href="https://github.com/rafaelleitedasilva" target="__blank" class="cd-words-wrapper">
                                            <b class="is-visible">Github</b>
                                        </a>
                                    </p>
                                    <p class="cd-headline letters scale">
                                        <a href="https://www.linkedin.com/in/rafael-leite-da-silva-10654a222/" target="__blank" class="cd-words-wrapper">
                                            <b class="is-visible">Linkedin</b>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="about-area section-padding40" id="sobre">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-xl-6 col-lg-6 col-md-10">
                        <div class="about-caption mb-50 text-white">
                            <!-- Section Tittle -->
                            <div class="section-tittle mb-35">
                                <h2>/sobre</h2>
                            </div>
                            <p class="text-white">
                                Desde os 15 anos, desenvolvo uma profunda paixão pelo universo da programação. Ao longo dessa jornada, tive a oportunidade de participar de diversos projetos, onde aprendi e troquei experiências com programadores talentosos. Essas vivências ampliaram minha visão, permitindo explorar uma variedade de linguagens e arquiteturas distintas.
                            </p>

                            <p class="text-white">
                                Atualmente, dedico-me a múltiplos projetos assíncronos, estudo o desenvolvimento de APIs REST com Golang, Data Analysis com SQL Server e criação de .
                            </p>

                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="about-img">
                            <img src="https://i.pinimg.com/originals/05/e9/f2/05e9f2dba5f0bde5ec8bd5af923604e0.gif"
                                alt="">
                        </div>
                    </div>
                </div>
                <div class="row pt-40">
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="experience">
                            <span>+ 5 anos</span>
                            <p class="text-white">Estudando inúmeras linguagens e aperfeiçoando o meu código com conceitos
                                SOLID e MVC</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="experience">
                            <span>APIs</span>
                            <p class="text-white">Ampla experiência com desenvolvimento de APIs REST utilizando Lumen</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="experience">
                            <span>Web</span>
                            <p class="text-white">Desenvolvimento web profissional com a agilidade e arquitetura do Laravel
                                10</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="may-about section-padding40" id="experiencia">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle2 mb-30">
                            <h2>/experiencia</h2>
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <div class="single-about">
                            <div class="tittle-experience">
                                <h4 class="text-white"><strong>GoodStorage</strong></h4>
                                <h3 class="text-white">  Desenvolvedor FullStack</h3>
                                <p class="text-white"> 21 de mar 2024 | atual ({{Carbon\Carbon::now()->diffInMonths(Carbon\Carbon::create("2024-03-21")) + 1}} meses)</p>
                            </div>
                            <div class="experience-link text-white">
                                <a href="#">São Paulo, São Paulo <i class="fas fa-external-link-alt"></i></a>
                            </div>
                        </div>
                    </div>



                    <div class="col-xl-12">
                        <div class="single-about">
                            <div class="tittle-experience">
                                <h4 class="text-white"><strong>Kasi</strong> </h4>
                                <h3 class="text-white"> Desenvolvedor FullStack</h3>
                                <p class="text-white"> 19 jun 2023 | 21 de mar 2024 ({{Carbon\Carbon::create('2024-03-21')->diffInMonths(Carbon\Carbon::create("2023-06-19")) + 1}} meses)</p>
                            </div>
                            <div class="experience-link text-white">
                                <a href="#">São Paulo, São Paulo <i class="fas fa-external-link-alt"></i></a>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12">
                        <div class="single-about">
                            <div class="tittle-experience">
                                <h4 class="text-white"><strong>Alumbra</strong> </h4>
                                <h3 class="text-white">Analista de Sistemas</h3>
                                <p class="text-white">19 fev 2022 | 19 jun 2023 ({{Carbon\Carbon::create("2022-02-19")->diffInMonths(Carbon\Carbon::create("2023-06-19")) + 1}} meses)</p>
                            </div>
                            <div class="experience-link text-white">
                                <a href="#">São Bernardo, São Paulo <i class="fas fa-external-link-alt"></i></a>
                            </div>
                        </div>
                    </div>

                    <hr class="text-white">
                    <div class="col-lg-12">
                        <div class="section-tittle2 mb-30 pt-50">
                            <h2>/educacao</h2>
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <div class="single-about">
                            <div class="tittle-experience">
                                <h6 class="text-white">UNINTER</h6>
                                <h3 class="text-white">Técnologo em Análise e Desenvolvimento de Sistemas</h3>
                                <p class="text-white"> 16 Jun 2023 | cursando</p>
                            </div>
                            <div class="experience-link">
                                <a href="#">Diadema, São Paulo <i class="fas fa-external-link-alt"></i></a>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12">
                        <div class="single-about">
                            <div class="tittle-experience">
                                <h6 class="text-white">SENAI</h6>
                                <h3 class="text-white">Técnico em Desenvolvimento de Sistemas</h3>
                                <p class="text-white">19 Jan 2022 | 16 Jun 2023</p>
                            </div>
                            <div class="experience-link">
                                <a href="#">Diadema, São Paulo <i class="fas fa-external-link-alt"></i></a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="our-services pt-top section-bg1" id="habilidades">
            <div class="container">
                <div class="rwo">
                    <div class="col-xl-12">
                        <div class="section-tittle mb-75 text-center">
                            <h2>/tecnologias</h2>
                        </div>
                    </div>
                </div>
                <div class="row d-flex justify-contnet-center">
                    <div class="col-lg-4 col-md-4 col-sm-6">
                        <div class="single-services mb-30" style="border-radius: 30px;">
                            <div class="services-cap">
                                <h5 class="text-white">Frontend</h5>
                                <p>HTML5</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 100%"></div>
                                </div>
                                <hr>
                                <p>CSS3</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 100%"></div>
                                </div>
                                <hr>
                                <p>Bootstrap</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 92%"></div>
                                </div>
                                <hr>
                                <p>JavaScript</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 90%"></div>
                                </div>
                                <hr>
                                <p>Vite</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 70%"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-6">
                        <div class="single-services mb-30" style="border-radius: 30px;">
                            <div class="services-cap">
                                <h5>Backend</h5>
                                <p>PHP</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 91%"></div>
                                </div>
                                <hr>
                                <p>Laravel</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 85%"></div>
                                </div>
                                <hr>
                                <p>Postman</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 80%"></div>
                                </div>
                                <hr>
                                <p>MySQL</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 65%"></div>
                                </div>
                                <hr>
                                <p>AWS SDK</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 49%"></div>
                                </div>
                                <hr>
                                <p>AWS S3</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 42%"></div>
                                </div>
                                <hr>
                                <p>NodeJs</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 35%"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4 col-sm-6">
                        <div class="single-services mb-30" style="border-radius: 30px;">
                            <div class="services-cap">
                                <h5>Infraestrutura</h5>

                                <p>Git</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 95%"></div>
                                </div>

                                <hr>

                                <p>Docker</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 91%"></div>
                                </div>

                                <hr>

                                <p>Vercel</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 70%"></div>
                                </div>

                                <hr>

                                <p>Heroku</p>
                                <div class="progress" role="progressbar" aria-label="Animated example"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                                        style="width: 50%"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="gallery-area section-padding40" id="trabalhos">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle mb-60">
                            <h2>/trabalhos-pessoais</h2>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-between">
                    @foreach($projetos["pessoal"] as $projeto)
                        <div class="col-xl-5 col-lg-6 col-md-6 col-sm-6">
                            <a data-bs-toggle="offcanvas" href="#{{$projeto['name']}}" role="button" aria-controls="{{$projeto['name']}}">
                                <div class="box snake mb-30">
                                    <div class="gallery-img small-img "
                                        style="background-image: url({{ Vite::asset('resources/images/'.$projeto['description']['images'][0]) }});background-position: center top;">
                                    </div>
                                    <div class="overlay">
                                        <div class="overlay-content">
                                            <img style="width: 170px;"
                                                src="{{ Vite::asset("resources/images/".$projeto['description']['images']['logo']) }}"
                                                alt="">
                                            <a href="" class="img-pop-up"><i class="ti-plus"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div class="offcanvas offcanvas-start" tabindex="-1" id="{{$projeto['name']}}" aria-labelledby="{{$projeto['name']}}Label">
                            <div class="offcanvas-header">
                                <h4 class="offcanvas-title text-white" id="offcanvasExampleLabel">{{$projeto['name']}}</h4>
                                <button type="button" class="p-3 border-0" style="color:white;background-color:transparent;" data-bs-dismiss="offcanvas" aria-label="Close">
                                    &#x2715
                                </button>
                            </div>
                            <div class="offcanvas-body">
                                <div>
                                    <h6>Descrição:</h6>
                                    <p class="text-white">{{$projeto['description']['description']}}</p>
                                </div>
                                <div class="tecnologies">
                                    <h6>Tecnologias utilizadas:</h6>
                                    <ul class="p-0 text-white">
                                        @foreach($projeto['description']['tecnologies'] as $tecnologia)
                                            <p class="m-0 p-0 text-white">- {{$tecnologia}}</p>
                                        @endforeach
                                    </ul>
                                </div>
                                @if(isset($projeto['description']['github']))
                                    <div class="mt-2">
                                        <h6  class="m-0 p-0">Github</h6>
                                        <a class="p-0 text-primary text-decoration-none" href="{{$projeto['description']['github']}}" target="_blank">Repositório {{$projeto['name']}}</a>
                                    </div>
                                @endif
                                @if(isset($projeto['description']['link']))
                                    <div class="mt-2 float-end">
                                        <h6 class="d-block m-0 p-0" style="text-align: right;">Link</h6>
                                        <a class="p-0 text-primary text-decoration-none" href="{{$projeto['description']['link']}}" target="_blank">Acessar {{$projeto['name']}}</a>
                                    </div>
                                @endif
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        <div class="gallery-area section-padding40" id="trabalhos">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle mb-60">
                            <h2>/trabalhos-empresariais</h2>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-between">
                    @foreach($projetos["empresa"] as $projeto)
                    <div class="col-xl-5 col-lg-6 col-md-6 col-sm-6">
                        <a data-bs-toggle="offcanvas" href="#{{$projeto['name']}}" role="button" aria-controls="{{$projeto['name']}}">
                            <div class="box snake mb-30">
                                <div class="gallery-img small-img "
                                    style="background-image: url({{ Vite::asset('resources/images/'.$projeto['description']['images'][0]) }});background-position: center top;">
                                </div>
                                <div class="overlay">
                                    <div class="overlay-content">
                                        <img style="width: 170px;"
                                            src="{{ Vite::asset("resources/images/".$projeto['description']['images']['logo']) }}"
                                            alt="">
                                        <a href="" class="img-pop-up"><i class="ti-plus"></i></a>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="offcanvas offcanvas-start" tabindex="-1" id="{{$projeto['name']}}" aria-labelledby="{{$projeto['name']}}Label">
                        <div class="offcanvas-header">
                            <h4 class="offcanvas-title text-white" id="offcanvasExampleLabel">{{$projeto['name']}}</h4>
                            <button type="button" class="p-3 border-0" style="color:white;background-color:transparent;" data-bs-dismiss="offcanvas" aria-label="Close">
                                &#x2715
                            </button>
                        </div>
                        <div class="offcanvas-body">
                            <div>
                                <h6>Descrição:</h6>
                                <p class="text-white">{{$projeto['description']['description']}}</p>
                            </div>
                            <div class="tecnologies">
                                <h6>Tecnologias utilizadas:</h6>
                                <ul class="p-0 text-white">
                                    @foreach($projeto['description']['tecnologies'] as $tecnologia)
                                        <p class="m-0 p-0 text-white">- {{$tecnologia}}</p>
                                    @endforeach
                                </ul>
                            </div>
                            @if(isset($projeto['description']['github']))
                                <div class="mt-2">
                                    <h6  class="m-0 p-0">Github</h6>
                                    <a class="p-0 text-primary text-decoration-none" href="{{$projeto['description']['github']}}" target="_blank">Repositório {{$projeto['name']}}</a>
                                </div>
                            @endif
                            {{-- @if(isset($projeto['description']['link']))
                                <div class="mt-2 float-end">
                                    <h6 class="d-block m-0 p-0" style="text-align: right;">Link</h6>
                                    <a class="p-0 text-primary text-decoration-none" href="{{$projeto['description']['link']}}" target="_blank">Acessar {{$projeto['name']}}</a>
                                </div>
                            @endif --}}
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>

    </main>
@endsection
