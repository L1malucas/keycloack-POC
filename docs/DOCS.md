# Documentacao POC Keycloak + Angular

## Arquitetura

```mermaid
C4Context
    title Sistema de Autenticacao SSO

    Person(user, "Usuario", "Usuario da aplicacao")
    System(angular, "Angular App", "Frontend SPA")
    System(keycloak, "Keycloak", "Identity Provider")
    System_Ext(google, "Google OAuth", "Identity Provider")

    Rel(user, angular, "Acessa")
    Rel(angular, keycloak, "Autentica via", "OIDC/OAuth2")
    Rel(keycloak, google, "Federa identidade", "OAuth2")
```

## Estrutura do Projeto

```
src/app/
├── core/
│   ├── services/
│   │   ├── auth.service.ts       # Autenticacao
│   │   └── user.service.ts       # Admin API
│   ├── guards/
│   │   └── auth.guard.ts         # authGuard, adminGuard
│   ├── interceptors/
│   │   └── auth.interceptor.ts   # Injeta token Bearer
│   └── models/
│       ├── user.model.ts
│       └── keycloak-config.model.ts
└── features/
    ├── auth/login.component       # /login
    ├── home/home.component        # /
    ├── profile/profile.component  # /profile (protegido)
    └── admin/admin.component      # /admin (role: admin)
```

## Fluxo de Autenticacao

```mermaid
sequenceDiagram
    actor User
    participant Angular
    participant Keycloak

    User->>Angular: Acessa /profile
    Angular->>Angular: authGuard verifica login
    Angular->>Keycloak: Redireciona para login
    User->>Keycloak: Insere credenciais
    Keycloak->>Keycloak: Valida credenciais
    Keycloak->>Angular: Redireciona com code
    Angular->>Keycloak: Troca code por token
    Keycloak->>Angular: Retorna access_token + refresh_token
    Angular->>Angular: Armazena tokens em memoria
    Angular->>User: Exibe /profile
```

## Fluxo de Login Social (Google)

```mermaid
sequenceDiagram
    actor User
    participant Angular
    participant Keycloak
    participant Google

    User->>Angular: Clica "Login com Google"
    Angular->>Keycloak: Redireciona (idpHint=google)
    Keycloak->>Google: Redireciona para OAuth
    User->>Google: Autentica
    Google->>Keycloak: Retorna token Google
    Keycloak->>Keycloak: Cria/atualiza usuario
    Keycloak->>Angular: Redireciona com code
    Angular->>Keycloak: Troca code por token Keycloak
    Keycloak->>Angular: Retorna access_token
    Angular->>User: Usuario logado
```

## Fluxo de Refresh Token

```mermaid
sequenceDiagram
    participant Angular
    participant Keycloak

    Note over Angular: Timer 60s
    Angular->>Angular: Verifica expiracao (70s)
    Angular->>Keycloak: POST /token (grant_type=refresh_token)
    Keycloak->>Keycloak: Valida refresh_token
    Keycloak->>Angular: Novo access_token
    Angular->>Angular: Atualiza token em memoria

    Note over Angular: Se falhar
    Angular->>Angular: logout()
    Angular->>Keycloak: /logout
```

## Fluxo de Requisicao HTTP

```mermaid
sequenceDiagram
    participant Component
    participant Interceptor
    participant Keycloak API
    participant Auth Service

    Component->>Interceptor: HTTP Request
    Interceptor->>Interceptor: Adiciona Bearer token
    Interceptor->>Keycloak API: Request com Authorization header

    alt Sucesso (200)
        Keycloak API->>Component: Response
    else Token expirado (401)
        Keycloak API->>Interceptor: 401 Unauthorized
        Interceptor->>Auth Service: updateToken()
        Auth Service->>Keycloak API: Refresh token
        Keycloak API->>Auth Service: Novo access_token
        Interceptor->>Interceptor: Retry request com novo token
        Interceptor->>Keycloak API: Request novamente
        Keycloak API->>Component: Response
    end
```

## Fluxo Admin - Gerenciar Roles

```mermaid
sequenceDiagram
    actor Admin
    participant Angular
    participant Admin API

    Admin->>Angular: Acessa /admin
    Angular->>Angular: adminGuard verifica role
    Angular->>Admin API: GET /users
    Admin API->>Angular: Lista de usuarios

    Admin->>Angular: Seleciona usuario
    Angular->>Admin API: GET /users/{id}/role-mappings
    Admin API->>Angular: Roles do usuario

    Admin->>Angular: Adiciona role "admin"
    Angular->>Admin API: POST /users/{id}/role-mappings
    Admin API->>Admin API: Valida permissoes do token
    Admin API->>Angular: Role atribuida
    Angular->>Admin: Feedback de sucesso
```

## Configuracao Keycloak

### 1. Criar Realm

```bash
Realm name: keycloak-poc
```

### 2. Criar Client

```yaml
Client ID: angular-client
Client authentication: OFF
Valid redirect URIs: http://localhost:4200/*
Web origins: http://localhost:4200
```

### 3. Criar Roles

```yaml
- admin
- user
```

### 4. Criar Usuarios

**Usuario Admin:**
```yaml
Username: admin
Password: admin123
Roles: [admin, user]
```

**Usuario Normal:**
```yaml
Username: user
Password: user123
Roles: [user]
```

### 5. Identity Provider Google (Opcional)

```yaml
Alias: google
Client ID: [SEU_GOOGLE_CLIENT_ID]
Client Secret: [SEU_GOOGLE_SECRET]
Redirect URI: http://localhost:8080/realms/keycloak-poc/broker/google/endpoint
```

## Metodos Principais

### AuthService

| Metodo | Descricao |
|--------|-----------|
| `init()` | Inicializa Keycloak |
| `login()` | Login normal |
| `loginWithGoogle()` | Login via Google |
| `logout()` | Desloga e invalida sessao |
| `getToken()` | Retorna access token |
| `updateToken(minValidity)` | Refresh token |
| `hasRole(role)` | Verifica role |
| `isLoggedIn()` | Status de autenticacao |

### UserService (Admin API)

| Metodo | Descricao |
|--------|-----------|
| `getUsers()` | Lista usuarios |
| `getUserRoles(userId)` | Roles do usuario |
| `assignRolesToUser(userId, roles)` | Adiciona roles |
| `removeRolesFromUser(userId, roles)` | Remove roles |

## Guards

| Guard | Validacao |
|-------|-----------|
| `authGuard` | Usuario autenticado |
| `adminGuard` | Usuario + role "admin" |

## Rotas

```typescript
/                 # Home (publico)
/login            # Login (publico)
/profile          # Perfil (authGuard)
/admin            # Admin (adminGuard)
```

## Seguranca

### Tokens em Memoria

```mermaid
graph LR
    A[Keycloak] -->|access_token| B[keycloak-js]
    B -->|armazena em memoria| C[JavaScript Variable]
    C -.nao persiste.-> D[localStorage]
    C -.nao persiste.-> E[sessionStorage]
    C -.nao persiste.-> F[Cookies]
```

### PKCE Flow

```mermaid
sequenceDiagram
    Angular->>Angular: Gera code_verifier
    Angular->>Angular: SHA256(code_verifier) = code_challenge
    Angular->>Keycloak: /auth + code_challenge
    Keycloak->>Angular: Retorna code
    Angular->>Keycloak: /token + code + code_verifier
    Keycloak->>Keycloak: Valida code_verifier
    Keycloak->>Angular: access_token
```

## Variaveis de Ambiente

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'keycloak-poc',
    clientId: 'angular-client'
  }
};
```

## Iniciar Projeto

```bash
# Terminal 1: Keycloak
docker run -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:23.0.4 start-dev

# Terminal 2: Angular
npm install
npm start

# Acessar
http://localhost:4200
```

## Testar Funcionalidades

### Login Admin
```
http://localhost:4200 → Fazer Login
Credenciais: admin / admin123
Acessar: /, /profile, /admin
```

### Login Usuario
```
Fazer Logout
Login: user / user123
/admin bloqueado (sem role)
```

### Refresh Token
```
/profile → Visualizar tokens
Aguardar 60s (refresh automatico)
Ou clicar "Atualizar Token Manualmente"
```

### Admin - Gerenciar Roles
```
Login: admin / admin123
/admin → Selecionar usuario
Adicionar/Remover roles
Verificar feedback
```

## Endpoints Keycloak

```yaml
# Autenticacao
GET  /realms/{realm}/protocol/openid-connect/auth
POST /realms/{realm}/protocol/openid-connect/token
GET  /realms/{realm}/protocol/openid-connect/logout

# Admin API
GET    /admin/realms/{realm}/users
GET    /admin/realms/{realm}/users/{id}
GET    /admin/realms/{realm}/users/{id}/role-mappings/realm
POST   /admin/realms/{realm}/users/{id}/role-mappings/realm
DELETE /admin/realms/{realm}/users/{id}/role-mappings/realm
GET    /admin/realms/{realm}/roles
```

## Troubleshooting

```mermaid
graph TD
    A[Erro?] --> B{Tipo}
    B -->|CORS| C[Verificar Web origins no client]
    B -->|401| D[Token expirado - fazer login novamente]
    B -->|403| E[Sem permissao - verificar roles]
    B -->|Redirect invalido| F[Verificar Valid redirect URIs]
    B -->|Admin API falha| G[Usuario precisa role admin]
```

## Arquivos Chave

| Arquivo | Funcao |
|---------|--------|
| `src/app/app.config.ts` | Inicializa Keycloak via APP_INITIALIZER |
| `src/app/core/services/auth.service.ts` | Gerencia autenticacao |
| `src/app/core/interceptors/auth.interceptor.ts` | Injeta token automaticamente |
| `src/app/core/guards/auth.guard.ts` | Protege rotas |
| `public/assets/silent-check-sso.html` | SSO silencioso |
| `src/environments/environment.ts` | Config Keycloak |
