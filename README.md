# POC Keycloak + Angular 21

SSO com Keycloak e Angular.

## Funcionalidades

- Login Keycloak + Google OAuth
- SSO e refresh automatico de tokens
- Guards de autenticacao e roles
- Admin panel para gerenciar usuarios/roles
- Interceptor HTTP automatico

## Inicio Rapido

```bash
# Terminal 1: Keycloak
docker run -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:23.0.4 start-dev

# Terminal 2: Angular
npm install
npm start
```

Acessar: http://localhost:4200

## Configurar Keycloak

Ver: [docs/SETUP.md](docs/SETUP.md)

Resumo:
1. Criar realm: `keycloak-poc`
2. Criar client: `angular-client`
3. Criar roles: `admin`, `user`
4. Criar usuarios: `admin/admin123`, `user/user123`

## Estrutura

```
src/app/
├── core/
│   ├── services/         # auth.service, user.service
│   ├── guards/           # authGuard, adminGuard
│   ├── interceptors/     # auth.interceptor
│   └── models/           # Interfaces
└── features/
    ├── auth/             # Login
    ├── home/             # Dashboard
    ├── profile/          # Perfil + tokens
    └── admin/            # Gerenciar usuarios/roles
```

## Rotas

| Rota | Guard | Role |
|------|-------|------|
| `/` | - | - |
| `/login` | - | - |
| `/profile` | authGuard | qualquer |
| `/admin` | adminGuard | admin |

## Documentacao

- [docs/DOCS.md](docs/DOCS.md) - Fluxos e diagramas
- [docs/SETUP.md](docs/SETUP.md) - Configuracao Keycloak
- [docs/RESUMO.md](docs/RESUMO.md) - Checklist de funcionalidades

## Testar

```bash
# Login admin
http://localhost:4200 → Login
Credenciais: admin / admin123
Acessar: /, /profile, /admin

# Login usuario
Logout
Login: user / user123
/admin bloqueado
```

## Arquivos Chave

| Arquivo | Funcao |
|---------|--------|
| `src/app/app.config.ts` | Inicializa Keycloak |
| `src/app/core/services/auth.service.ts` | Autenticacao |
| `src/app/core/interceptors/auth.interceptor.ts` | Token Bearer |
| `src/environments/environment.ts` | Config Keycloak |
