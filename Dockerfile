FROM quay.io/keycloak/keycloak:23.0.4

# Variaveis de ambiente para admin
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

# Configuracao de locale padrao para pt-BR
ENV KC_SPI_THEME_DEFAULT_LOCALE=pt-BR

# Configuracoes para producao
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_HTTP_RELATIVE_PATH=/
ENV KC_HOSTNAME_STRICT=false
ENV KC_PROXY=edge
ENV KC_HTTP_ENABLED=true

# Configuracoes de banco de dados (variaveis serao fornecidas em runtime)
# KC_DB=postgres
# KC_DB_URL=postgresql://keycloak_db_dwhh_user:ydvc7e3a1yiV9crM94e4q0WsQ9QwMRUu@dpg-d51amubuibrs73bao9pg-a/keycloak_db_dwhh
# KC_DB_USERNAME=keycloak_db_dwh_user
# KC_DB_PASSWORD=ydvc7e3a1yiV9crM94e4q0WsQ9QwMRUu

# Copiar arquivo de configuracao do realm
COPY keycloak/realm-config.json /opt/keycloak/data/import/realm-config.json

# Copiar apenas o tema customizado (não substituir todos os temas)
COPY keycloak/themes/custom /opt/keycloak/themes/custom

# Build do Keycloak com suporte a PostgreSQL
RUN /opt/keycloak/bin/kc.sh build --db=postgres

# Expor porta
EXPOSE 8080

# Iniciar com import do realm
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--optimized", "--import-realm"]
