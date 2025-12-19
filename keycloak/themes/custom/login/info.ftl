<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "title">
        ${msg("loginTitle",realm.displayName)}
    <#elseif section = "header">
        <#if messageHeader??>
            ${kcSanitize(messageHeader)?no_esc}
        <#else>
            ${kcSanitize(message.summary)?no_esc}
        </#if>
    <#elseif section = "form">
        <div id="kc-info-message">
            <p class="instruction">
                <#if requiredActions??>
                    <#list requiredActions>
                        <b>
                            <#items as reqActionItem>
                                ${kcSanitize(msg("requiredAction.${reqActionItem}"))?no_esc}<#sep>, </#sep>
                            </#items>
                        </b>
                    </#list>
                <#else>
                    ${kcSanitize(message.summary)?no_esc}
                </#if>
            </p>

            <#if skipLink??>
            <#else>
                <#if pageRedirectUri?has_content>
                    <p><a href="${pageRedirectUri}">${kcSanitize(msg("backToApplication"))?no_esc}</a></p>
                <#elseif actionUri?has_content>
                    <p><a href="${actionUri}">${kcSanitize(msg("proceedWithAction"))?no_esc}</a></p>
                <#elseif client.baseUrl?has_content>
                    <p><a href="${client.baseUrl}">${kcSanitize(msg("backToApplication"))?no_esc}</a></p>
                </#if>
            </#if>
        </div>
    </#if>
</@layout.registrationLayout>
