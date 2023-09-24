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
                          <p>Desenvolvedor Fullstack</p>
                          <p class="cd-headline letters scale">Github: 
                              <a href="https://github.com/rafaelleitedasilva" target="__blank" class="cd-words-wrapper">
                                  <b class="is-visible">rafaelleitedasilva</b>
                              </a>
                          </p>
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
                    <p class="text-white">[ texto descritivo ]</p>
                  
                    <p class="text-white">[ texto descritivo ]</p>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="about-img">
                    <img src="https://i.pinimg.com/originals/05/e9/f2/05e9f2dba5f0bde5ec8bd5af923604e0.gif" alt="">
                </div>
            </div>
        </div>
        <div class="row pt-40">
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="experience">
                    <span>+ 5 anos</span>
                    <p class="text-white">estudando inúmeras linguagens e aperfeiçoando o meu código <br> com conceitos SOLID e MVC</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="experience">
                    <span>APIS</span>
                    <p class="text-white">Ampla experiência com desenvolvimento de APIs REST<br> utilizando Laravel</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="experience">
                    <span>Web</span>
                    <p class="text-white">desenvolvimento web profissional <br> com testes automatizados de e2e (end to end)</p>
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
                          <h3 class="text-white">Analista de Sistemas</h3>
                          <p class="text-white">21 fev 2022 | 19 jun 2023 <small> ~ 1a4m </small></p>
                      </div>
                      <div class="experience-link text-white">
                          <a href="#">São Bernardo do Campo, São Paulo <i class="fas fa-external-link-alt"></i></a>
                      </div>
                  </div>
              </div>
              <div class="col-xl-12">
                  <div class="single-about">
                      <div class="tittle-experience">
                          <h3 class="text-white">Desenvolvedor Fullstack</h3>
                          <p class="text-white"> 19 fev 2022 | atual</p>
                      </div>
                      <div class="experience-link text-white">
                          <a href="#">Campo Belo, São Paulo <i class="fas fa-external-link-alt"></i></a>
                      </div>
                  </div>
              </div>
              <hr class="text-white">
              <div class="col-lg-12">
                  <div class="section-tittle2 mb-30 pt-50">
                      <h2>Educação</h2>
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
          </div>
      </div>
  </div>

  <div class="our-services pt-top section-bg1" id="habilidades">
      <div class="container">
          <div class="rwo">
              <div class="col-xl-12">
                  <div class="section-tittle mb-75 text-center">
                      <h2>Tecnologias</h2>
                  </div>
              </div>
          </div>
          <div class="row d-flex justify-contnet-center">
              <div class="col-lg-4 col-md-4 col-sm-6">
                  <div class="single-services mb-30" style="border-radius: 30px;">
                      <div class="services-cap">
                          <h5 class="text-white">Frontend</h5>
                          <p>HTML5</p>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" style="width: 100%"></div>
                          </div>
                          <hr>
                          <p>CSS3</p>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" style="width: 100%"></div>
                          </div>
                          <hr>
                          <p>Bootstrap</p>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" style="width: 92%"></div>
                          </div>
                          <hr>
                          <p>JavaScript</p>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" style="width: 90%"></div>
                          </div>
                          <hr>
                          <p>Vite</p>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" style="width: 70%"></div>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="col-lg-4 col-md-4 col-sm-6">
                  <div class="single-services mb-30" style="border-radius: 30px;">
                      <div class="services-cap">
                          <h5>Backend</h5>
                          <p>PHP</p>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" style="width: 91%"></div>
                          </div>
                          <hr>
                          <p>Laravel</p>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" style="width: 85%"></div>
                          </div>
                          <hr>
                          <p>MySQL</p>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" style="width: 65%"></div>
                          </div>
                          <hr>
                          <p>AWS SDK</p>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" style="width: 49%"></div>
                          </div>
                          <hr>
                          <p>AWS S3</p>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" style="width: 42%"></div>
                          </div>
                          <hr>
                          <p>NodeJs</p>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" style="width: 35%"></div>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="col-lg-4 col-md-4 col-sm-6">
                  <div class="single-services mb-30" style="border-radius: 30px;">
                      <div class="services-cap">
                          <h5>Infraestrutura</h5>
                          
                          <p>Git</p>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" style="width: 95%"></div>
                          </div>

                          <hr>

                          <p>Docker</p>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" style="width: 91%"></div>
                          </div>
                          
                          <hr>

                          <p>Vercel</p>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" style="width: 70%"></div>
                          </div>

                          <hr>
                          
                          <p>Heroku</p>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" style="width: 50%"></div>
                          </div>
                      </div>
                  </div>
              </div>

              
          </div>
      </div>
  </div>

  {{-- <div class="gallery-area section-padding40" id="trabalhos">
      <div class="container">
          <div class="row">
              <div class="col-lg-12">
                  <div class="section-tittle mb-60">
                      <h2>Trabalhos</h2>
                  </div>
              </div>
          </div>
          <div class="row justify-content-between">
              <div class="offset-xl-1 col-xl-5 col-lg-6 col-md-6 col-sm-6">
                  <div class="box snake mb-30">
                      <div class="gallery-img small-img " style="background-image: url();"></div>
                      <div class="overlay">
                          <div class="overlay-content">
                              <a href="assets/img/gallery/gallery1.png" class="img-pop-up"><i class="ti-plus"></i></a>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-xl-5 ol-lg-6 col-lg-6 col-md-6 col-sm-6">
                  <div class="box snake mb-30">
                      <div class="gallery-img small-img " style="background-image: url();"></div>
                      <div class="overlay">
                          <div class="overlay-content">
                              <a href="" class="img-pop-up"><i class="ti-plus"></i></a>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="offset-xl-1 col-xl-5 col-lg-6 col-md-6 col-sm-6">
                  <div class="box snake mb-30">
                      <div class="gallery-img small-img " style="background-image: url();"></div>
                      <div class="overlay">
                          <div class="overlay-content">
                              <a href="" class="img-pop-up"><i class="ti-plus"></i></a>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-xl-5 col-lg-6 col-md-6 col-sm-6">
                  <div class="box snake mb-30">
                      <div class="gallery-img small-img " style="background-image: url();"></div>
                      <div class="overlay">
                          <div class="overlay-content">
                              <a href="" class="img-pop-up"><i class="ti-plus"></i></a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div> --}}

</main>
@endsection