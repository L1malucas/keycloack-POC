# Keycloak Realm Configuration

Este diretório contém as configurações do realm Keycloak para o projeto.

## Arquivos

- `realm-export.json` - Export original do realm de produção (CFTV)
- `realm-import-ready.json` - Realm processado e pronto para importação (gerado automaticamente)

## Como Usar o Realm de Produção

### 1. Preparar o Realm para Importação

Execute o script que adapta as URLs e configurações:

```bash
npm run prepare-realm
```

Este script irá:
- ✅ Atualizar o nome do realm para `keycloak-poc`
- ✅ Configurar URLs de redirect para Vercel e localhost
- ✅ Criar/atualizar o client `angular-client`
- ✅ Adicionar roles básicas (admin, user)
- ✅ Limpar dados sensíveis (usuários, secrets)
- ✅ Gerar arquivo `realm-import-ready.json`

### 2. Importar no Keycloak

#### Opção A: Partial Import (Recomendado - Mantém dados existentes)

1. Acesse: `https://keycloack-poc.onrender.com/admin`
2. Login com credenciais de admin
3. Selecione o realm `keycloak-poc`
4. Vá em: **Realm Settings** → **Action** → **Partial Import**
5. Clique em "Browse" e selecione: `keycloak/realm-import-ready.json`
6. Escolha a estratégia:
   - **Skip**: Ignora itens que já existem (recomendado)
   - **Overwrite**: Substitui itens existentes
7. Clique em **Import**

#### Opção B: Full Replace (Substitui tudo - Use com cuidado!)

1. Acesse: `https://keycloack-poc.onrender.com/admin`
2. Vá em: **Realm Settings** → **Action** → **Delete**
3. Delete o realm atual
4. Na tela principal do admin, clique em **Create Realm**
5. Clique em "Browse" e selecione: `keycloak/realm-import-ready.json`
6. Clique em **Create**

⚠️ **ATENÇÃO**: Esta opção apaga TODOS os dados existentes!

### 3. Verificar a Importação

Após importar, verifique:

1. **Client Configuration**
   - Acesse: Clients → `angular-client`
   - Verifique se as URLs estão corretas:
     - Valid Redirect URIs: `https://keycloackpoc.vercel.app/*`, `http://localhost:4200/*`
     - Web Origins: `https://keycloackpoc.vercel.app`, `http://localhost:4200`

2. **Roles**
   - Acesse: Realm roles
   - Deve ter no mínimo: `admin`, `user`

3. **Criar Usuário Admin** (se não existir)
   ```bash
   # No container do Keycloak
   /opt/keycloak/bin/kcadm.sh create users \
     -r keycloak-poc \
     -s username=admin \
     -s enabled=true \
     -s email=admin@keycloakpoc.com

   # Definir senha
   /opt/keycloak/bin/kcadm.sh set-password \
     -r keycloak-poc \
     --username admin \
     --new-password your-password

   # Adicionar role admin
   /opt/keycloak/bin/kcadm.sh add-roles \
     -r keycloak-poc \
     --uusername admin \
     --rolename admin
   ```

## Personalizar o Script

Edite `scripts/prepare-realm-import.js` para mudar:

```javascript
const CONFIG = {
  realm: {
    name: 'keycloak-poc',          // Nome do realm
    displayName: 'Keycloak POC',   // Nome de exibição
  },
  urls: {
    production: 'https://keycloackpoc.vercel.app',
    development: 'http://localhost:4200',
    keycloak: 'https://keycloack-poc.onrender.com'
  },
  clients: {
    mainClient: 'angular-client'   // Nome do client principal
  }
};
```

## Estrutura do Realm

O realm de produção (CFTV) inclui:

- **Clients**: cftv-client, cftv-api
- **Roles**: Sistema complexo de roles por funcionalidade
- **Client Scopes**: Configurados para API
- **Groups**: Desenvolvedor (com todas as permissões)
- **Protocol Mappers**: Customizados para o token

Após a importação, você terá acesso a toda essa estrutura adaptada para o projeto POC.

## Troubleshooting

### Erro: "Client already exists"
- Use Partial Import com estratégia "Skip"
- Ou delete o client existente antes

### Erro: "Role already exists"
- Use Partial Import com estratégia "Skip"

### URLs não funcionam após import
- Verifique se executou `npm run prepare-realm`
- Confira manualmente as URLs no Admin Console

## Backup

Antes de qualquer importação, faça backup:

```bash
# Export do realm atual
curl -X GET "https://keycloack-poc.onrender.com/admin/realms/keycloak-poc" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  > keycloak/backup-$(date +%Y%m%d).json
```
