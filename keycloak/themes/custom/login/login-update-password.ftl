<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('password','password-confirm'); section>
    <#if section = "title">
        ${msg("updatePasswordTitle")}
    <#elseif section = "header">
    <#elseif section = "form">
        <div id="kc-form" class="login-container">
            <!-- Left Side - Blue Section -->
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

            <!-- Right Side - White Section -->
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
                        <h2>Atualizar Senha</h2>
                        <p>Digite sua nova senha</p>
                    </div>

                    <form id="kc-passwd-update-form" action="${url.loginAction}" method="post">
                        <input type="text" id="username" name="username" value="${username}" autocomplete="username" readonly="readonly" style="display:none;"/>
                        <input type="password" id="password" name="password" autocomplete="current-password" style="display:none;"/>

                        <div class="form-group">
                            <label for="password-new">Nova senha</label>
                            <div class="input-wrapper ${messagesPerField.printIfExists('password','input-error')}">
                                <svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="9" width="14" height="9" rx="1" stroke="#666" stroke-width="2"/>
                                    <path d="M6 9V6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6V9" stroke="#666" stroke-width="2"/>
                                    <circle cx="10" cy="13.5" r="1.5" fill="#666"/>
                                </svg>
                                <input type="password" id="password-new" name="password-new" autofocus autocomplete="new-password"
                                       aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>" />
                            </div>
                            <#if messagesPerField.existsError('password')>
                                <span class="error-message">${kcSanitize(messagesPerField.get('password'))?no_esc}</span>
                            </#if>
                        </div>

                        <div class="form-group">
                            <label for="password-confirm">Confirmar senha</label>
                            <div class="input-wrapper ${messagesPerField.printIfExists('password-confirm','input-error')}">
                                <svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="9" width="14" height="9" rx="1" stroke="#666" stroke-width="2"/>
                                    <path d="M6 9V6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6V9" stroke="#666" stroke-width="2"/>
                                    <circle cx="10" cy="13.5" r="1.5" fill="#666"/>
                                </svg>
                                <input type="password" id="password-confirm" name="password-confirm" autocomplete="new-password"
                                       aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>" />
                            </div>
                            <#if messagesPerField.existsError('password-confirm')>
                                <span class="error-message">${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}</span>
                            </#if>
                        </div>

                        <div class="form-options" style="margin-bottom: 24px;">
                            <#if isAppInitiatedAction??>
                                <a href="${url.loginUrl}" class="back-to-login">← ${msg("backToLogin")?no_esc}</a>
                            </#if>
                        </div>

                        <button type="submit" class="login-button">${msg("doSubmit")}</button>
                    </form>

                    <div class="footer-text">
                        <p>Sistema de Identificação - Instituto de Identificação Pedro Mello</p>
                    </div>
                </div>
            </div>
        </div>
    </#if>
</@layout.registrationLayout>
