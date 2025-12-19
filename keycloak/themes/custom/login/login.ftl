<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password'); section>
    <#if section = "title">
        ${msg("loginTitle", realm.name)}
    <#elseif section = "header">
    <#elseif section = "form">
        <main class="detran-login-container">
            <!-- Background Image -->
            <img src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=800&fit=crop" alt="Fundo da tela de login" class="detran-background-image" />
            <div class="detran-background-overlay"></div>

            <!-- Login Form -->
            <form id="kc-form-login" class="detran-login-form" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                <!-- Logo Detran -->
                <img src="https://placehold.co/200x80/003366/FFFFFF/png?text=DETRAN+BA" alt="Logo Detran BA" class="detran-logo" />

                <h3 class="detran-title">SISTEMA DE CLÍNICAS</h3>

                <!-- Campo de Documento -->
                <div class="detran-form-field">
                    <label for="username" class="detran-label">Documento</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        class="detran-input-secondary"
                        placeholder="Digite seu CPF"
                        autofocus
                        autocomplete="off"
                        aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"
                    />
                    <#if messagesPerField.existsError('username')>
                        <span class="detran-error-message">${kcSanitize(messagesPerField.get('username'))?no_esc}</span>
                    </#if>
                </div>

                <!-- Campo de Senha -->
                <div class="detran-form-field detran-password-field">
                    <label for="password" class="detran-label">Senha</label>
                    <div class="detran-password-wrapper">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            class="detran-input-secondary-password"
                            placeholder="Digite sua senha"
                            autocomplete="off"
                            aria-invalid="<#if messagesPerField.existsError('password')>true</#if>"
                        />
                        <span class="detran-eye-icon" onclick="togglePassword()">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5C5.636 5 2 12 2 12s3.636 7 10 7 10-7 10-7-3.636-7-10-7z" stroke="currentColor" stroke-width="2"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </span>
                    </div>
                    <#if messagesPerField.existsError('password')>
                        <span class="detran-error-message">${kcSanitize(messagesPerField.get('password'))?no_esc}</span>
                    </#if>
                </div>

                <!-- Link Esqueceu a Senha -->
                <#if realm.resetPasswordAllowed>
                    <a href="${url.loginResetCredentialsUrl}" class="detran-forget-password">Esqueceu a senha?</a>
                </#if>

                <!-- reCAPTCHA Placeholder -->
                <div class="detran-captcha">
                    <div class="detran-recaptcha-placeholder">
                        <input type="checkbox" id="captcha-check" />
                        <label for="captcha-check">Não sou um robô</label>
                        <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" class="recaptcha-logo" />
                    </div>
                </div>

                <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>

                <!-- Botão Entrar -->
                <button type="submit" class="detran-login-button" name="login">
                    ENTRAR
                </button>

                <!-- Divider -->
                <div class="detran-divider"></div>

                <!-- Seção Primeiro Acesso -->
                <div class="detran-section-first-login">
                    <p>É o seu <strong>Primeiro Acesso?</strong></p>
                    <p>Ative sua conta <a href="#" class="detran-first-login-link">clicando aqui.</a></p>
                </div>
            </form>
        </main>

        <script>
            function togglePassword() {
                var passwordField = document.getElementById('password');
                if (passwordField.type === 'password') {
                    passwordField.type = 'text';
                } else {
                    passwordField.type = 'password';
                }
            }
        </script>
    </#if>
</@layout.registrationLayout>
