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

## Tema Customizado

Este projeto inclui um tema customizado para a tela de login do Keycloak, inspirado no design moderno com layout split-screen.

### Estrutura do Tema

```
keycloak/themes/custom/
├── login/
│   ├── login.ftl                    # Template da página de login
│   ├── template.ftl                 # Template base
│   ├── theme.properties             # Configurações do tema
│   └── resources/
│       ├── css/
│       │   └── styles.css          # Estilos customizados
│       ├── js/
│       │   └── script.js           # Scripts JavaScript
│       └── images/                 # Imagens do tema
├── account/
│   └── theme.properties            # Tema da conta do usuário
└── email/
    └── theme.properties            # Tema dos emails
```

### Características do Tema

- **Layout Split-Screen**: Lado esquerdo azul com informações de boas-vindas e lado direito branco com o formulário de login
- **Design Moderno**: Interface limpa e profissional
- **Responsivo**: Adaptável para diferentes tamanhos de tela (desktop, tablet, mobile)
- **Elementos Visuais**:
  - Ícone de impressão digital animado
  - Ícones nos campos de entrada
  - Botões com efeitos hover
  - Gradiente de fundo no lado azul

### Configuração

O tema customizado já está configurado no `realm-config.json`:

```json
{
  "loginTheme": "custom",
  "accountTheme": "custom",
  "emailTheme": "custom"
}
```

### Como Aplicar o Tema

#### 1. Build e Deploy Automático

Quando você faz build e deploy do Docker container, o tema é automaticamente copiado:

```bash
# Build da imagem Docker
docker build -t keycloak-poc .

# Run do container
docker run -p 8080:8080 keycloak-poc
```

#### 2. Aplicar Manualmente no Admin Console

Se o tema não estiver aplicado automaticamente:

1. Acesse: `http://localhost:8080/admin`
2. Login com admin/admin
3. Selecione o realm `keycloak-poc`
4. Vá em: **Realm Settings** → **Themes**
5. Configure:
   - **Login Theme**: custom
   - **Account Theme**: custom
   - **Email Theme**: custom
6. Clique em **Save**

### Personalizar o Tema

#### Cores

Edite `/keycloak/themes/custom/login/resources/css/styles.css`:

```css
:root {
    --primary-blue: #2B579A;      /* Cor azul principal */
    --secondary-blue: #3D6DB5;    /* Cor azul secundária */
    --white: #FFFFFF;
    --light-gray: #F5F5F5;
    --text-dark: #333333;
    --text-light: #666666;
    --border-color: #E0E0E0;
}
```

#### Textos

Edite `/keycloak/themes/custom/login/login.ftl` para alterar:

- Mensagens de boas-vindas
- Textos informativos
- Placeholders dos campos

#### Logo e Ícones

Substitua as imagens em:
- `/keycloak/themes/custom/login/resources/images/`

### Testar Localmente

1. Faça as alterações no tema
2. Rebuild da imagem Docker:
   ```bash
   docker build -t keycloak-poc .
   ```
3. Execute o container:
   ```bash
   docker run -p 8080:8080 keycloak-poc
   ```
4. Acesse: `http://localhost:8080/realms/keycloak-poc/account`
5. Faça logout e veja a tela de login customizada

### Troubleshooting

#### Tema não aparece
- Verifique se o Dockerfile copiou os arquivos: `COPY keycloak/themes /opt/keycloak/themes`
- Rebuild da imagem Docker
- Limpe o cache do navegador (Ctrl+Shift+R)

#### Estilos não aplicados
- Verifique o caminho em `theme.properties`: `styles=css/styles.css`
- Verifique se o arquivo CSS existe
- Use as ferramentas de desenvolvedor do navegador para debugar

#### Erro 404 em recursos
- Verifique os caminhos das imagens no `login.ftl`
- Certifique-se que os arquivos existem em `resources/images/`
