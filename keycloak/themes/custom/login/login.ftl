<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "title">
        ${msg("loginTitle", realm.name)}
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
                        <h2>Entre na sua conta</h2>
                        <p>Acesse com as suas credenciais</p>
                    </div>

                    <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                        <div class="form-group">
                            <label for="username">Email | Usuário</label>
                            <div class="input-wrapper">
                                <svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="#666"/>
                                    <path d="M10 12C5.58172 12 2 15.5817 2 20H18C18 15.5817 14.4183 12 10 12Z" fill="#666"/>
                                </svg>
                                <input type="text" id="username" name="username" placeholder="atila.almeida" required />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password">Senha</label>
                            <div class="input-wrapper">
                                <svg class="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="9" width="14" height="9" rx="1" stroke="#666" stroke-width="2"/>
                                    <path d="M6 9V6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6V9" stroke="#666" stroke-width="2"/>
                                    <circle cx="10" cy="13.5" r="1.5" fill="#666"/>
                                </svg>
                                <input type="password" id="password" name="password" placeholder="••••••" required />
                            </div>
                        </div>

                        <div class="form-options">
                            <#if realm.rememberMe && !(usernameHidden!false)>
                            <div class="remember-me">
                                <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" />
                                <label for="rememberMe">${msg("rememberMe")}</label>
                            </div>
                            </#if>

                            <#if realm.resetPasswordAllowed>
                            <a href="${url.loginResetCredentialsUrl}" class="forgot-password">
                                ${msg("doForgotPassword")}
                            </a>
                            </#if>
                        </div>

                        <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>

                        <button type="submit" class="login-button">
                            ${msg("doLogIn")}
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
