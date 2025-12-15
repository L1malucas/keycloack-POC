FROM quay.io/keycloak/keycloak:23.0.4

# Variaveis de ambiente para admin
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

# Configuracoes para producao
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_HTTP_RELATIVE_PATH=/
ENV KC_HOSTNAME_STRICT=false
ENV KC_PROXY=edge
ENV KC_HTTP_ENABLED=true
ENV KC_CACHE=local

# Copiar arquivo de configuracao do realm
COPY keycloak/realm-config.json /opt/keycloak/data/import/realm-config.json

# Copiar temas customizados
COPY keycloak/themes/ /opt/keycloak/themes/

# Build do Keycloak com configuracoes para cache local
RUN /opt/keycloak/bin/kc.sh build --cache=local

# Expor porta
EXPOSE 8080

# Iniciar com import do realm
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--optimized", "--import-realm"]
