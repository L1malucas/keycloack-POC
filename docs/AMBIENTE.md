# Configuracao de Ambiente

## URLs da Aplicacao

### Producao (Vercel)
- URL: https://keycloackpoc.vercel.app
- Keycloak redirect URIs: `https://keycloackpoc.vercel.app/*`
- Web origins: `https://keycloackpoc.vercel.app`

### Desenvolvimento (Local)
- URL: http://localhost:4200
- Keycloak redirect URIs: `http://localhost:4200/*`
- Web origins: `http://localhost:4200`

## Configurar Keycloak para Multiplos Ambientes

No Keycloak Admin Console:

1. Ir em Clients > angular-client > Settings

2. Adicionar ambas URLs em **Valid redirect URIs**:
   ```
   https://keycloackpoc.vercel.app/*
   http://localhost:4200/*
   ```

3. Adicionar ambas URLs em **Web origins**:
   ```
   https://keycloackpoc.vercel.app
   http://localhost:4200
   ```

4. Salvar

Agora a aplicacao funciona em ambos ambientes!

## Variavel de Ambiente

A aplicacao detecta automaticamente o ambiente:

```typescript
// src/environments/environment.ts (producao)
appUrl: 'https://keycloackpoc.vercel.app'

// src/environments/environment.development.ts (dev)
appUrl: 'http://localhost:4200'
```
