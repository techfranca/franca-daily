# 🚀 Franca Daily

Sistema de Daily Reports da Franca - Registro diário automatizado com Google Sheets

## 🛠️ Tecnologias

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js (Google OAuth)
- Google Sheets API

## 📋 Pré-requisitos

1. Node.js 18+ instalado
2. Conta Google (Google Cloud Console)
3. Google Sheets criado

## ⚙️ Setup Passo a Passo

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar Google OAuth

1. Acesse: https://console.cloud.google.com
2. Crie um novo projeto
3. Ative a **Google+ API**
4. Em "Credenciais", crie **OAuth 2.0 Client ID**
5. Adicione URLs autorizadas:
   - http://localhost:3000
   - http://localhost:3000/api/auth/callback/google
6. Copie **Client ID** e **Client Secret**

### 3. Configurar Google Sheets API

1. No mesmo projeto do Google Cloud
2. Ative a **Google Sheets API**
3. Crie **Service Account**
4. Gere chave JSON
5. Copie o email do service account
6. Abra sua planilha e compartilhe com o email do service account (permissão de editor)

### 4. Criar Google Sheet

1. Crie nova planilha no Google Sheets
2. Renomeie as abas para:
   - Davidson
   - Membro 2
   - Membro 3
   - Membro 4
   - Membro 5
3. Copie o ID da planilha (está na URL)

### 5. Configurar .env.local

Crie arquivo `.env.local` na raiz do projeto:
```bash
# Google OAuth
GOOGLE_CLIENT_ID=seu_client_id
GOOGLE_CLIENT_SECRET=seu_client_secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=rode_openssl_rand_base64_32_no_terminal

# Google Sheets
GOOGLE_SHEET_ID=id_da_planilha
GOOGLE_PRIVATE_KEY="chave_privada_do_service_account"
GOOGLE_SERVICE_ACCOUNT_EMAIL=email_do_service_account

# Emails autorizados
AUTHORIZED_EMAILS=davidson@franca.com,membro2@franca.com,membro3@franca.com,membro4@franca.com,membro5@franca.com
```

### 6. Rodar o projeto
```bash
npm run dev
```

Acesse: http://localhost:3000

## 📊 Estrutura da Planilha

Cada aba terá as colunas:
- Data
- Hora
- O que você fez hoje?
- Houve alguma dificuldade?
- Planos para amanhã

## 🎨 Cores da Marca

- Verde Principal: #7DE08D
- Verde Escuro: #598F74
- Azul: #081534
- Branco: #FFFFFF

## 📝 Fluxo de Uso

1. Usuário faz login com Google
2. Sistema verifica se email está autorizado
3. Usuário preenche formulário com 3 perguntas
4. Sistema salva automaticamente na aba correta do Google Sheets
5. Data e hora são capturadas automaticamente

## 🔒 Segurança

- Apenas emails autorizados podem acessar
- Autenticação via Google OAuth
- Dados salvos no Google Sheets da empresa

## 🐛 Troubleshooting

### Erro: "Não autorizado"
- Verifique se seu email está em AUTHORIZED_EMAILS

### Erro: "Google Sheets API"
- Verifique se compartilhou a planilha com o service account
- Verifique se a API está ativada

### Erro: "NextAuth"
- Verifique NEXTAUTH_SECRET
- Verifique URLs no Google Cloud Console

## 📞 Suporte

Dúvidas? Fale com Davidson!