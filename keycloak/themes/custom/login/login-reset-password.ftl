<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true displayMessage=!messagesPerField.existsError('username'); section>
    <#if section = "title">
        ${msg("emailForgotTitle")} - ${realm.displayNameHtml!realm.name}
    <#elseif section = "header">
    <#elseif section = "form">
        <div id="kc-form" class="login-container">
            <!-- Left Side - Blue Section -->
            <div class="left-side">
                <div class="left-content">
                    <!-- Fingerprint Icon -->
                    <div class="fingerprint-icon">
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="100" cy="100" r="80" stroke="rgba(255, 255, 255, 0.3)" stroke-width="3"/>
                            <circle cx="100" cy="100" r="60" stroke="rgba(255, 255, 255, 0.3)" stroke-width="3"/>
                            <circle cx="100" cy="100" r="40" stroke="rgba(255, 255, 255, 0.3)" stroke-width="3"/>
                            <circle cx="100" cy="100" r="20" stroke="rgba(255, 255, 255, 0.3)" stroke-width="3"/>
                        </svg>
                    </div>

                    <!-- Welcome Text -->
                    <div class="welcome-text">
                        <h1>Olá, bem vindo!</h1>
                        <p>Acesse o ECM360 para consultar os dados biográficos e biométricos das fichas de identificação civil</p>
                    </div>
                </div>

                <!-- Bottom Text -->
                <div class="bottom-text">
                    <p>Transformando a gestão documental com tecnologia e inovação</p>
                </div>
            </div>

            <!-- Right Side - White Section -->
            <div class="right-side">
                <!-- Logo Icon -->
                <div class="logo-icon">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="10" width="20" height="25" fill="#2B579A"/>
                        <rect x="30" y="10" width="25" height="25" fill="#2B579A"/>
                        <rect x="5" y="40" width="50" height="5" fill="#FDB913"/>
                    </svg>
                </div>

                <div class="form-content">
                    <div class="form-header">
                        <h2>Esqueceu a Senha?</h2>
                        <p>Digite seu email cadastrado para recuperar sua senha</p>
                    </div>

                    <#if message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
                        <div class="alert alert-${message.type}">
                            <#if message.type = 'success'><span class="pficon pficon-ok"></span></#if>
                            <#if message.type = 'warning'><span class="pficon pficon-warning-triangle-o"></span></#if>
                            <#if message.type = 'error'><span class="pficon pficon-error-circle-o"></span></#if>
                            <#if message.type = 'info'><span class="pficon pficon-info"></span></#if>
                            <span class="kc-feedback-text">${kcSanitize(message.summary)?no_esc}</span>
                        </div>
                    </#if>

                    <form id="kc-reset-password-form" action="${url.loginAction}" method="post">
                        <div class="form-group">
                            <label for="username">Email cadastrado</label>
                            <div class="input-wrapper ${messagesPerField.printIfExists('username','input-error')}">
                                <svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" fill="#666"/>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" fill="#666"/>
                                </svg>
                                <input type="text" id="username" name="username" placeholder="seuemail@exemplo.com"
                                       autofocus
                                       value="${(auth.attemptedUsername!'')}"
                                       aria-invalid="<#if messagesPerField.existsError('username')>true</#if>" />
                            </div>
                            <#if messagesPerField.existsError('username')>
                                <span class="error-message" aria-live="polite">
                                    ${kcSanitize(messagesPerField.get('username'))?no_esc}
                                </span>
                            </#if>
                        </div>

                        <div class="form-options" style="margin-bottom: 24px;">
                            <a href="${url.loginUrl}" class="back-to-login">
                                ← Voltar ao login
                            </a>
                        </div>

                        <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>

                        <button type="submit" class="login-button">
                            ${msg("doSubmit")}
                        </button>

                        <div class="info-text">
                            <p>Você receberá um email com instruções para redefinir sua senha</p>
                        </div>
                    </form>

                    <div class="footer-text">
                        <p>Sistema de Identificação - Instituto de Identificação Pedro Mello</p>
                    </div>
                </div>
            </div>
        </div>
    </#if>
</@layout.registrationLayout>
