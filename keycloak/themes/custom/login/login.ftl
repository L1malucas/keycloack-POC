<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "title">
        ${msg("loginTitle", realm.name)}
    <#elseif section = "header">
    <#elseif section = "form">
        <div id="kc-form" class="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--cin-background)] relative p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-6 2xl:p-8">
            <div class="w-full max-w-[98vw] sm:max-w-[95vw] md:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[79vw] 2xl:max-w-[71.25rem] min-h-[95vh] sm:min-h-[90vh] md:min-h-[85vh] lg:min-h-[80vh] lg:aspect-[1140/783] lg:max-h-[90vh] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[1.875rem] relative overflow-hidden">
                <div class="absolute -left-2.5 -top-1.5 w-[102%] h-[102%]">
                    <img src="${url.resourcesPath}/images/png/background-login.png" alt="Background" class="w-full h-full object-cover" />
                </div>
                <div class="absolute inset-0 bg-[var(--cin-primary)] opacity-60 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[1.875rem]"></div>

                <div class="absolute inset-0 flex flex-col p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-[6.3125rem] 2xl:pt-[2.9375rem] overflow-y-auto">
                    <div class="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-[4.0625rem] h-full">
                        <div class="w-full h-auto flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6 shrink-0">
                            <img src="${url.resourcesPath}/images/svg/security-icon.svg" alt="Segurança" class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-[7.4375rem] 2xl:h-[7.4375rem] shrink-0 order-2 sm:order-1" />
                            <div class="flex flex-col flex-1 order-1 sm:order-2 min-w-0">
                                <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 2xl:text-[5.851875rem] font-semibold text-[var(--cin-text-primary)] leading-tight mb-0 sm:mb-0.5 md:mb-1 break-words">CIN</h1>
                                <p class="text-[0.5rem] sm:text-[0.625rem] md:text-xs lg:text-sm xl:text-base text-[var(--cin-text-primary)] leading-tight sm:leading-normal break-words">
                                    Sistema de Identificação Civil para emissão da Carteira de Identidade Nacional
                                </p>
                            </div>
                        </div>

                        <div class="flex flex-col lg:flex-row items-center lg:items-end gap-2.5 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-[3.9375rem] w-full flex-1 min-h-0">
                            <div class="relative w-full max-w-[8rem] sm:max-w-[10rem] md:max-w-[12rem] lg:max-w-[14rem] xl:max-w-[17.5rem] 2xl:max-w-[21.9375rem] aspect-[351/468] shrink-0 mx-auto sm:mx-0">
                                <img src="${url.resourcesPath}/images/png/face-image.png" alt="Reconhecimento facial" class="w-full h-full object-cover rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[1.25rem]" />
                                <div class="absolute inset-0 pointer-events-none rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[1.25rem]"></div>
                            </div>

                            <div class="w-full max-w-full lg:max-w-[50%] xl:max-w-[32.75rem] flex flex-col gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-[0.9375rem]">
                                <div class="flex flex-col gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 shrink-0">
                                    <h2 class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-[var(--cin-text-primary)] leading-tight mb-0">
                                        Acesse o CIN
                                    </h2>
                                    <p class="text-[0.5rem] sm:text-[0.625rem] md:text-xs lg:text-sm xl:text-base text-[var(--cin-text-primary)] leading-tight sm:leading-normal text-center sm:text-left">
                                        Ambiente seguro, autorizado apenas a operadores credenciados
                                    </p>
                                </div>
                                
                                <form id="kc-form-login" class="flex flex-col gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-[0.9375rem] flex-1 min-h-0" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                                    <div class="flex flex-col gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 xl:gap-[0.9375rem]">
                                        <div class="flex flex-col gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2">
                                            <label for="username" class="text-[0.625rem] sm:text-xs md:text-sm lg:text-base font-medium text-[var(--cin-text-secondary)]">${msg("username")}</label>
                                            <div class="w-full px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 md:py-2.5 bg-[var(--cin-white)] border-b-2 border-[var(--cin-primary-light)] rounded-md sm:rounded-lg md:rounded-xl lg:rounded-[0.625rem]">
                                                <input type="text" id="username" name="username" placeholder="000.000.000-00" class="w-full bg-transparent text-[0.625rem] sm:text-xs md:text-sm lg:text-base text-[var(--cin-text-secondary)] placeholder:text-[var(--cin-text-secondary)] placeholder:opacity-60 focus:outline-none" />
                                            </div>
                                        </div>

                                        <div class="flex flex-col">
                                            <div class="flex flex-col gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 mb-2 sm:mb-2.5 md:mb-3 lg:mb-3.5 xl:mb-[0.9375rem]">
                                                <label for="password" class="text-[0.625rem] sm:text-xs md:text-sm lg:text-base font-medium text-[var(--cin-text-secondary)]">${msg("password")}</label>
                                                <div class="w-full px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-2 md:py-2.5 bg-[var(--cin-white)] border-b-2 border-[var(--cin-primary-light)] rounded-md sm:rounded-lg md:rounded-xl lg:rounded-[0.625rem]">
                                                    <input type="password" id="password" name="password" placeholder="Digite sua senha" class="w-full bg-transparent text-[0.625rem] sm:text-xs md:text-sm lg:text-base text-[var(--cin-text-secondary)] placeholder:text-[var(--cin-text-secondary)] placeholder:opacity-60 focus:outline-none" />
                                                </div>
                                            </div>

                                            <#if realm.rememberMe && !(usernameHidden!false)>
                                            <div class="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-0 py-0.5 sm:py-1 md:py-1.5 lg:py-2">
                                                <input tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" checked class="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded border-2 border-[var(--cin-text-primary)] text-[var(--cin-text-primary)] focus:ring-2 focus:ring-[var(--cin-primary-light)] bg-[var(--cin-white)] shrink-0 cursor-pointer">
                                                <label for="rememberMe" class="text-[0.5rem] sm:text-[0.625rem] md:text-xs lg:text-sm text-[var(--cin-text-tertiary)] cursor-pointer break-words select-none">${msg("rememberMe")}</label>
                                            </div>
                                            </#if>
                                        </div>
                                    </div>

                                    <div class="flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 shrink-0">
                                         <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                                        <button type="submit" class="w-full bg-[var(--cin-primary-dark)] hover:bg-[var(--cin-primary-darker)] active:bg-[var(--cin-primary-darker)] text-[var(--cin-text-button)] font-bold py-1.5 sm:py-2 md:py-2.5 lg:py-3 px-3 sm:px-4 md:px-5 rounded-md sm:rounded-lg md:rounded-xl lg:rounded-[0.625rem] text-[0.625rem] sm:text-xs md:text-sm lg:text-base transition-colors min-h-[2.5rem] sm:min-h-[2.75rem] md:min-h-[3rem] lg:min-h-[3.5rem] xl:min-h-[3.75rem] flex items-center justify-center touch-manipulation cursor-pointer">
                                            ${msg("doLogIn")}
                                        </button>
                                        <#if realm.resetPasswordAllowed>
                                        <a href="${url.loginResetCredentialsUrl}" class="w-full text-[var(--cin-primary-dark)] hover:text-[var(--cin-primary-darker)] active:text-[var(--cin-primary-darker)] text-[0.5rem] sm:text-[0.625rem] md:text-xs lg:text-sm py-1 sm:py-1.5 md:py-2 lg:py-2.5 transition-colors min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[2.75rem] lg:min-h-[3rem] xl:min-h-[3.5rem] flex items-center justify-center touch-manipulation cursor-pointer">
                                           ${msg("doForgotPassword")}
                                        </a>
                                        </#if>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="hidden sm:flex absolute right-2 sm:right-3 md:right-4 lg:right-5 xl:right-6 2xl:right-[8.8125rem] top-2 sm:top-3 md:top-4 lg:top-5 xl:top-6 2xl:top-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-[8.8125rem] 2xl:h-[7.8125rem] items-center justify-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 xl:gap-5 p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-5">
                </div>
            </div>

            <div class="absolute bottom-0.5 sm:bottom-1 md:bottom-2 lg:bottom-3 xl:bottom-4 2xl:bottom-[5.0625rem] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6 2xl:gap-12 w-full px-1.5 sm:px-2 md:px-3 lg:px-4">
                <div class="flex items-center">
                    <p class="text-[0.5rem] sm:text-[0.625rem] md:text-xs lg:text-sm text-[var(--cin-primary-dark)] text-center px-1 sm:px-2 md:px-3 py-0 sm:py-0.5 md:py-1 lg:py-1.5 break-words">
                        Sistema seguro e certificado para serviços governamentais digitais
                    </p>
                </div>
            </div>
        </div>
    </#if>
</@layout.registrationLayout>
