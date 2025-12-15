<#--
  ~ Copyright 2016 Red Hat, Inc. and/or its affiliates
  ~ and other contributors as indicated by the @author tags.
  ~
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~ you may not use this file except in compliance with the License.
  ~ You may obtain a copy of the License at
  ~
  ~ http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing, software
  ~ distributed under the License is distributed on an "AS IS" BASIS,
  ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  --#>
<#macro registrationLayout bodyClass="">
    <!DOCTYPE html>
    <html class="${properties.kcHtmlClass!}"<#if realm.internationalizationEnabled> lang="${locale.current}"</#if>>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="robots" content="noindex, nofollow">

        <title><#nested "title"></title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="icon" href="${url.resourcesPath}/img/favicon.ico"/>
        <#if properties.meta?has_content>
            <#list properties.meta?split(' ') as meta>
                <meta name="${meta?split('==')[0]}" content="${meta?split('==')[1]}"/>
            </#list>
        </#if>
        <#if properties.styles?has_content>
            <#list properties.styles?split(' ') as style>
                <link href="${url.resourcesPath}/${style}" rel="stylesheet"/>
            </#list>
        </#if>
        <#if properties.scripts?has_content>
            <#list properties.scripts?split(' ') as script>
                <script src="${url.resourcesPath}/${script}" type="text/javascript"></script>
            </#list>
        </#if>
        <#if scripts??>
            <#list scripts as script>
                <script src="${script}" type="text/javascript"></script>
            </#list>
        </#if>
    </head>
    <body class="${properties.kcBodyClass!}">
    <div class="${properties.kcLoginClass!}">
        <div id="kc-header" class="${properties.kcHeaderClass!}">
            <div id="kc-header-wrapper"
                 class="${properties.kcHeaderWrapperClass!}"><#nested "header"></div>
        </div>

        <div class="${properties.kcFormCardClass!}">
            <header class="${properties.kcFormHeaderClass!}">
                <#if realm.internationalizationEnabled>
                    <div class="${properties.kcLocaleMainClass!}" id="kc-locale">
                        <div id="kc-locale-wrapper" class="${properties.kcLocaleWrapperClass!}">
                            <div class="kc-dropdown" id="kc-locale-dropdown">
                                <a href="#" id="kc-current-locale-link">${locale.current}</a>
                                <ul>
                                    <#list locale.supported as l>
                                        <li class="kc-dropdown-item"><a href="${l.url}">${l.label}</a></li>
                                    </#list>
                                </ul>
                            </div>
                        </div>
                    </div>
                </#if>
                <#nested "form_header">
            </header>
            <div id="kc-content-wrapper">
                <#nested "form">
            </div>
        </div>
    </div>
    </body>
    </html>
</#macro>