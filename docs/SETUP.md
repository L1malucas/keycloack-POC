# Setup Keycloak

## 1. Iniciar Keycloak

```bash
docker run -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:23.0.4 start-dev
```

Aguardar: `Keycloak 23.0.4 started`

## 2. Acessar Console

http://localhost:8080 → Administration Console

Login: `admin` / `admin`

## 3. Criar Realm

```
Master dropdown → Create realm
Realm name: keycloak-poc
[Create]
```

## 4. Criar Client

```
Clients → Create client

General Settings:
  Client ID: angular-client
  [Next]

Capability config:
  Client authentication: OFF
  Standard flow: ON
  Direct access grants: ON
  [Next]

Login settings:
  Root URL: https://keycloackpoc.vercel.app
  Valid redirect URIs: https://keycloackpoc.vercel.app/*
  Web origins: https://keycloackpoc.vercel.app
  [Save]
```

## 5. Criar Roles

```
Realm roles → Create role

Role 1:
  Role name: admin
  [Save]

Role 2:
  Role name: user
  [Save]
```

## 6. Criar Usuario Admin

```
Users → Create new user

Username: admin
Email: admin@example.com
Email verified: ON
First name: Admin
Last name: User
[Create]

Aba Credentials:
  [Set password]
  Password: admin123
  Temporary: OFF
  [Save]

Aba Role mapping:
  [Assign role]
  Selecionar: admin + user
  [Assign]
```

## 7. Criar Usuario Normal

```
Users → Create new user

Username: user
Email: user@example.com
Email verified: ON
First name: Normal
Last name: User
[Create]

Aba Credentials:
  Password: user123
  Temporary: OFF

Aba Role mapping:
  Selecionar: user
  [Assign]
```

## 8. Google OAuth (Opcional)

### Google Cloud Console

```
1. https://console.cloud.google.com
2. Criar projeto: "Keycloak POC"
3. APIs & Services → OAuth consent screen
   - User Type: External
   - App name: Keycloak POC
   - Test users: [seu email]

4. Credentials → Create OAuth client ID
   - Type: Web application
   - Authorized redirect URIs:
     http://localhost:8080/realms/keycloak-poc/broker/google/endpoint
   - Copiar Client ID e Client Secret
```

### Keycloak

```
Identity providers → Google

Alias: google
Display name: Login com Google
Client ID: [COLAR DO GOOGLE]
Client Secret: [COLAR DO GOOGLE]
Trust email: ON
[Save]
```

## Checklist

- [ ] Keycloak rodando: http://localhost:8080
- [ ] Realm `keycloak-poc` criado
- [ ] Client `angular-client` configurado
- [ ] Roles `admin` e `user` criadas
- [ ] Usuario `admin` criado (senha: admin123, roles: admin+user)
- [ ] Usuario `user` criado (senha: user123, roles: user)
- [ ] (Opcional) Google OAuth configurado

## Testar Configuracao

```bash
# Terminal 1: Keycloak ja rodando
# Terminal 2:
cd keycloak-POC
npm install
npm start

# Browser
https://keycloackpoc.vercel.app
Login: admin / admin123
```

## Troubleshooting

```yaml
Erro CORS:
  - Clients → angular-client → Web origins: https://keycloackpoc.vercel.app

Redirect invalido:
  - Valid redirect URIs: https://keycloackpoc.vercel.app/*

Admin API 403:
  - Usuario precisa role "admin"
  - Verificar em Role mapping

Google login nao aparece:
  - Identity providers → google → Enabled: ON
```

## Comandos Docker

```bash
# Ver containers
docker ps

# Logs
docker logs -f [CONTAINER_ID]

# Parar
docker stop [CONTAINER_ID]

# Restart
docker restart [CONTAINER_ID]
```
