<footer>
    <div class="footer-wrappr">
        <div class="footer-top">
            <!-- Want To work -->
            <section class="wantToWork-area" id="contato">
                <div class="container">
                    <div class="wants-wrapper w-padding2">
                        <div class="row align-items-center justify-content-between">
                            <div class="col-xl-7 col-lg-9 col-md-8">
                                <div class="wantToWork-caption wantToWork-caption2">
                                    <h3 class="text-white">Quer saber um pouco mais sobre mim ou sobre o meu trabalho?
                                    </h3>
                                </div>
                            </div>
                            <div class="col-xl-2 col-lg-3 col-md-4">
                                <a href="{{ Vite::asset('resources/documents/RafaelLeiteDaSilva.pdf') }}"
                                    class="sm-left text-white" style="font-size: 20px; text-decoration:none;">Currículo
                                    <img style="width: 20px;" src="{{ Vite::asset('resources/images/download.png') }}"
                                        alt=""></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Want To work End -->
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">

                        <!-- contact-form -->
                        <div class="form-wrapper">
                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="w-100 d-flex flex-wrap justify-content-between small-tittle mb-30">
                                        <h4 class="text-white">Contate-me</h4>
                                        @if (Session::has('message'))
                                            <p class="text-white text-right">{{ Session::get('message') }}</p>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <form id="contact-form" action="{{ route('email') }}" method="POST">
                                @csrf
                                <div class="row">
                                    <div class="col-lg-4 col-md-6">
                                        <div class="form-box user-icon mb-25">
                                            <input type="text" name="name" placeholder="Nome" required>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-6">
                                        <div class="form-box email-icon mb-25">
                                            <input type="text" name="email" placeholder="Email" required>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-6">
                                        <div class="form-box email-icon mb-25">
                                            <input type="text" name="context" placeholder="Assunto" required>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="form-box message-icon mb-25">
                                            <textarea name="message" id="message" placeholder="Mensagem" required></textarea>
                                        </div>
                                        <div class="submit-info">
                                            <button class="submit-btn2" type="submit">Enviar</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- footer-bottom area -->
        <div class="footer-bottom-area">
            <div class="container">
                <div class="footer-border">
                    <div class="row align-items-center">
                        <div class="col-xl-4 col-lg-4">
                            {{-- <div class="footer-social">
                                <a href="#"><i class="fab fa-twitter"></i></a>
                                <a href="https://bit.ly/sai4ull"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-pinterest-p"></i></a>
                                <a href="#"><i class="fas fa-globe"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                            </div> --}}
                        </div>
                        <div class="col-xl-8 col-lg-8">
                            <div class="footer-copy-right f-right">
                                <p>
                                    Copyright &copy;
                                    <script>
                                        document.write(new Date().getFullYear());
                                    </script> Todos os direitos reservados <i class="fa fa-heart"
                                        aria-hidden="true"></i> por <a href="https://rafaelleitedasilva.dev.br"
                                        target="_blank">Rafael Leite da Silva</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
