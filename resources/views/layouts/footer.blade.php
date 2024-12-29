<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
<div class="offcanvas-header">
    <h5 id="offcanvasRightLabel">Offcanvas right</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>
<div class="offcanvas-body">
    ...
</div>
</div>

<div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasBottomLabel">Copyright</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
            <span class="material-symbols-outlined">
                close
            </span>
        </button>
    </div>
    <div class="offcanvas-body small ">
        <p class="text-white" style="font-size: 14px;">Todas as outras imagens apresentadas no site são prévias dos serviços desenvolvidoas, e portanto não apresentam direitos autorias. As imagens a seguir foram pegas da internet, essa seção é responsável por dar os devidos créditos a elas:</p>
        <div class="d-flex flex-wrap">
            <div class="about-img">
                <a href="https://i.pinimg.com/originals/05/e9/f2/05e9f2dba5f0bde5ec8bd5af923604e0.gif">
                    <img width="200" src="https://i.pinimg.com/originals/05/e9/f2/05e9f2dba5f0bde5ec8bd5af923604e0.gif"
                        alt="Esfera de Partículas">
                </a>
            </div>
            <div class="about-img">
                <a href="https://64.media.tumblr.com/7fba0a38b3089324d31da2ce998ec9de/6ae3608dc296e9ff-c3/s640x960/1ad528c67b1005a1bb158f29816a91969849c59c.gif">
                    <img width="200" src="https://64.media.tumblr.com/7fba0a38b3089324d31da2ce998ec9de/6ae3608dc296e9ff-c3/s640x960/1ad528c67b1005a1bb158f29816a91969849c59c.gif" alt="Cubo Mágico">
                </a>
            </div>
        </div>
    </div>
</div>

<footer>
    <div class="footer-wrappr">
        <div class="footer-top" id="contato">
                <!-- Want To work -->
                {{-- <section class="wantToWork-area" >
                    <div class="container">
                        <div class="wants-wrapper w-padding2">
                            <div class="row align-items-center justify-content-between">
                                <div class="col-xl-7 col-lg-9 col-md-8">
                                    <div class="wantToWork-caption wantToWork-caption2">
                                        <h3 class="text-white">Quer saber um pouco mais sobre mim ou sobre o meu trabalho?
                                        </h3>
                                    </div>
                                </div>
                                <div class="d-flex col-md-4">
                                    <a href="{{ Vite::asset('resources/documents/RafaelLeiteDaSilva.pdf') }}"
                                        class="submit-btn2 text-white text-center"
                                        style="font-size: 16px;line-heigth:100%;line-height:40px;border-radius:4px;margin:2px;"
                                        target="_blank">Currículo
                                    </a>
                                <p class="text-white mt-1">\\</p>
                                    <a href="https://github.com/rafaelleitedasilva/Certificados"
                                        class="submit-btn2 text-white text-center"
                                        style="font-size: 16px; text-decoration:none;line-height:40px;border-radius:4px;margin:2px;"
                                        target="_blank">
                                        Certificados
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> --}}
            <!-- Want To work End -->
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <!-- contact-form -->
                        <div class="form-wrapper">
                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="w-100 d-flex flex-wrap justify-content-between small-tittle">
                                        <h3 class="text-white">Contate-me</h3>
                                        <p class="w-100 text-white text-align-end">
                                            <small>
                                                Entrando em contato direto pelo
                                                <strong>E-mail:</strong> rafaelleitedasilva.dev@outlook.com<br>
                                                Ou utilizando o formulário abaixo.
                                            </small>
                                        </p>

                                    </div>
                                </div>
                            </div>
                            <form id="contact-form" action="{{ route('email') }}" method="POST">
                                @csrf
                                <div class="row text-white">
                                    <div class="col-lg-4 col-md-6">
                                        <div class="form-box user-icon mb-25">
                                            <input type="text" name="name" placeholder="Nome" required>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-6">
                                        <div class="form-box email-icon mb-25">
                                            <input type="email" name="email" placeholder="Email" required>
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
                        <div class="col-xl-4 col-lg-4 footer-copy-right">
                        </div>
                        <div class="col-xl-8 col-lg-8">
                            <div class="footer-copy-right f-right">
                                <p>
                                    <a
                                        class="cd-words-wrapper text-decoration-underline text-white-50" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom"
                                        aria-controls="offcanvasBottom">Copyright</a>
                                    &copy;
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

<!-- Modal de Obrigado -->
<div id="thankYouModal" class="modal-overlay" style="display: none;" onclick="closeModal()">
    <div class="modal-content text-white">
        <h1>Obrigado!</h1>
        <p class="text-white">Sua mensagem foi enviada, entraremos em contato assim que a nossa equipe receber a sua mensagem.</p>
    </div>
</div>

<!-- Script para abrir/fechar o modal -->
<script>
    document.addEventListener('DOMContentLoaded', () => {
        @if (Session::has('message'))
            document.getElementById('thankYouModal').style.display = 'flex';
        @endif
    });

    function closeModal() {
        document.getElementById('thankYouModal').style.display = 'none';
    }
</script>
