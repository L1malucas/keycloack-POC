<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','email','firstName','lastName'); section>
    <#if section = "title">
        ${msg("loginProfileTitle")}
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
                        <h2>Atualizar Perfil</h2>
                        <p>Complete suas informações</p>
                    </div>

                    <form id="kc-update-profile-form" action="${url.loginAction}" method="post">
                        <div class="form-group">
                            <label for="email">${msg("email")}</label>
                            <div class="input-wrapper ${messagesPerField.printIfExists('email','input-error')}">
                                <input type="text" id="email" name="email" value="${(user.email!'')}" readonly="readonly" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="username">${msg("username")}</label>
                            <div class="input-wrapper ${messagesPerField.printIfExists('username','input-error')}">
                                <input type="text" id="username" name="username" value="${(user.username!'')}" readonly="readonly" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="firstName">${msg("firstName")}</label>
                            <div class="input-wrapper ${messagesPerField.printIfExists('firstName','input-error')}">
                                <input type="text" id="firstName" name="firstName" value="${(user.firstName!'')}" />
                            </div>
                            <#if messagesPerField.existsError('firstName')>
                                <span class="error-message">${kcSanitize(messagesPerField.get('firstName'))?no_esc}</span>
                            </#if>
                        </div>

                        <div class="form-group">
                            <label for="lastName">${msg("lastName")}</label>
                            <div class="input-wrapper ${messagesPerField.printIfExists('lastName','input-error')}">
                                <input type="text" id="lastName" name="lastName" value="${(user.lastName!'')}" />
                            </div>
                            <#if messagesPerField.existsError('lastName')>
                                <span class="error-message">${kcSanitize(messagesPerField.get('lastName'))?no_esc}</span>
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
