<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "title">
        ${msg("termsTitle")}
    <#elseif section = "header">
    <#elseif section = "form">
        <div id="kc-form" class="login-container">
            <div class="left-side">
                <div class="left-content">
                    <div class="fingerprint-icon">
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="100" cy="100" r="80" stroke="rgba(255, 255, 255, 0.3)" stroke-width="3"/>
                            <circle cx="100" cy="100" r="60" stroke="rgba(255, 255, 255, 0.3)" stroke-width="3"/>
                            <circle cx="100" cy="100" r="40" stroke="rgba(255, 255, 255, 0.3)" stroke-width="3"/>
                            <circle cx="100" cy="100" r="20" stroke="rgba(255, 255, 255, 0.3)" stroke-width="3"/>
                        </svg>
                    </div>
                    <div class="welcome-text">
                        <h1>Olá, bem vindo!</h1>
                        <p>Acesse o ECM360 para consultar os dados biográficos e biométricos das fichas de identificação civil</p>
                    </div>
                </div>
                <div class="bottom-text">
                    <p>Transformando a gestão documental com tecnologia e inovação</p>
                </div>
            </div>

            <div class="right-side">
                <div class="logo-icon">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="10" width="20" height="25" fill="#2B579A"/>
                        <rect x="30" y="10" width="25" height="25" fill="#2B579A"/>
                        <rect x="5" y="40" width="50" height="5" fill="#FDB913"/>
                    </svg>
                </div>

                <div class="form-content">
                    <div class="form-header">
                        <h2>Termos e Condições</h2>
                        <p>Por favor, leia e aceite os termos</p>
                    </div>

                    <div class="info-text" style="max-height: 300px; overflow-y: auto; margin-bottom: 24px;">
                        ${kcSanitize(msg("termsText"))?no_esc}
                    </div>

                    <form action="${url.loginAction}" method="POST">
                        <button type="submit" class="login-button" name="accept" style="margin-bottom: 12px;">
                            ${msg("doAccept")}
                        </button>
                        <button type="submit" class="login-button" name="cancel" style="background: #dc3545;">
                            ${msg("doDecline")}
                        </button>
                    </form>

                    <div class="footer-text">
                        <p>Sistema de Identificação - Instituto de Identificação Pedro Mello</p>
                    </div>
                </div>
            </div>
        </div>
    </#if>
</@layout.registrationLayout>
