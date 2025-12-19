<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true displayMessage=!messagesPerField.existsError('username'); section>
    <#if section = "title">
        ${msg("emailForgotTitle")}
    <#elseif section = "header">
    <#elseif section = "form">
        <div class="cin-reset-container">
            <!-- Container principal -->
            <div class="cin-main-card">
                <!-- Background image -->
                <div class="cin-background-wrapper">
                    <img src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=800&fit=crop" alt="Background" class="cin-background-image" />
                </div>

                <!-- Overlay com cor primária -->
                <div class="cin-background-overlay"></div>

                <!-- Conteúdo principal -->
                <div class="cin-content">
                    <!-- Header: Logo CIN -->
                    <div class="cin-header">
                        <img src="https://placehold.co/112x112/FFFFFF/2B579A/png?text=🔒" alt="Segurança" class="cin-security-icon" />
                        <div class="cin-header-text">
                            <h1 class="cin-main-title">CIN</h1>
                            <p class="cin-subtitle">Sistema de Identificação Civil para emissão da Carteira de Identidade Nacional</p>
                        </div>
                    </div>

                    <!-- Área principal: Imagem + Formulário -->
                    <div class="cin-main-area">
                        <!-- Imagem estática de recuperação de senha -->
                        <div class="cin-image-section">
                            <div class="cin-image-wrapper">
                                <img src="https://placehold.co/400x400/E8F4FD/2B579A/png?text=🔑+Recuperação" alt="Recuperação de senha" class="cin-recovery-image" />
                            </div>
                        </div>

                        <!-- Formulário de recuperação de senha -->
                        <div class="cin-form-section">
                            <!-- Título do formulário -->
                            <div class="cin-form-header">
                                <h2 class="cin-form-title">Esqueceu a Senha?</h2>
                                <p class="cin-form-description">Digite seu email cadastrado para recuperar sua senha</p>
                            </div>

                            <!-- Campos do formulário -->
                            <form id="kc-reset-password-form" class="cin-form" action="${url.loginAction}" method="post">
                                <!-- Campo Email -->
                                <div class="cin-form-group">
                                    <label for="username" class="cin-label">Email cadastrado</label>
                                    <div class="cin-input-wrapper ${messagesPerField.printIfExists('username','cin-input-error')}">
                                        <input
                                            id="username"
                                            type="text"
                                            name="username"
                                            placeholder="seuemail@exemplo.com"
                                            class="cin-input"
                                            value="${(auth.attemptedUsername!'')}"
                                            autofocus
                                            aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"
                                        />
                                    </div>
                                    <#if messagesPerField.existsError('username')>
                                        <span class="cin-error-message">${kcSanitize(messagesPerField.get('username'))?no_esc}</span>
                                    </#if>
                                </div>

                                <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>

                                <!-- Botões -->
                                <div class="cin-button-group">
                                    <!-- Botão ENVIAR -->
                                    <button type="submit" class="cin-submit-button">
                                        ENVIAR
                                    </button>

                                    <!-- Link Voltar ao login -->
                                    <a href="${url.loginUrl}" class="cin-back-link">
                                        Voltar ao login
                                    </a>
                                </div>

                                <!-- Texto informativo -->
                                <p class="cin-info-text">
                                    Você poderá reenviar o código para<br />
                                    o email cadastrado em <span class="cin-timer">00:00</span>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Logo Renova - canto superior direito -->
                <div class="cin-renova-logo">
                    <img src="https://placehold.co/64x64/FFFFFF/2B579A/png?text=R" alt="Logo Renova" class="cin-renova-image" />
                </div>
            </div>

            <!-- Footer -->
            <div class="cin-footer">
                <p class="cin-footer-text">Sistema seguro e certificado para serviços governamentais digitais</p>
            </div>
        </div>
    </#if>
</@layout.registrationLayout>
