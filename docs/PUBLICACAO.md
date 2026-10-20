# Publicação gratuita — passo a passo

Este guia não presume que você já tenha domínio ou hospedagem. Tudo abaixo é gratuito.

**Resumo técnico**

| Item | Valor |
| --- | --- |
| Instalar dependências | `npm install` |
| Desenvolvimento | `npm run dev` → http://localhost:5173 |
| Build de produção | `npm run build` |
| Pasta a publicar | `dist` |
| Versão do Node | 20 ou superior (22 recomendado) |
| Rotas internas (SPA) | já configuradas em `public/_redirects` e `netlify.toml` |

---

## 1. Guardar o código no GitHub

O GitHub é onde o código fica salvo e versionado. Netlify e Cloudflare leem o código de lá e publicam
automaticamente a cada atualização.

1. Crie uma conta gratuita em https://github.com.
2. Clique em **New repository**, dê um nome (ex.: `portfolio`) e crie o repositório **sem** README.
3. No terminal, dentro da pasta do projeto:

   ```bash
   git init
   git add .
   git commit -m "Primeira versão do portfólio"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/portfolio.git
   git push -u origin main
   ```

   > Se este projeto já veio de um repositório do GitHub, basta fazer `git push` das alterações.

4. A cada mudança:

   ```bash
   git add .
   git commit -m "Descreva o que mudou"
   git push
   ```

Alternativa sem terminal: o aplicativo **GitHub Desktop** (https://desktop.github.com) faz os mesmos passos com botões.

---

## 2. Opção A — Netlify (recomendado para começar)

1. Crie uma conta em https://app.netlify.com (pode entrar com o GitHub).
2. **Add new site → Import an existing project → GitHub** e escolha o repositório.
3. As configurações já vêm do `netlify.toml`. Confira:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Clique em **Deploy**. Em cerca de 1 minuto o site estará em um endereço como
   `https://nome-aleatorio.netlify.app`.
5. Em **Site configuration → Change site name**, troque para algo como `studiodigital` →
   `https://studiodigital.netlify.app`.

**Rotas internas:** o arquivo `public/_redirects` (`/* /index.html 200`) faz o Netlify devolver o aplicativo em qualquer
endereço. Assim, atualizar a página em `/demos/gestao360` ou abrir um link direto para um imóvel funciona sem erro 404.

## 2. Opção B — Cloudflare Pages

1. Crie uma conta em https://dash.cloudflare.com.
2. **Workers & Pages → Create → Pages → Connect to Git** e escolha o repositório.
3. Configuração:
   - Framework preset: **Vite** (ou “None”)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Variável de ambiente (se pedir versão do Node): `NODE_VERSION` = `22`
4. **Save and Deploy**. O endereço será `https://nome-do-projeto.pages.dev`.

**Rotas internas:** o Cloudflare Pages também lê o arquivo `public/_redirects`, e trata projetos sem `404.html` como
aplicativo de página única. Nenhuma configuração extra é necessária.

---

## 3. Depois da primeira publicação

1. Abra `src/config/site.ts` e preencha:
   - `siteUrl`: o endereço público (ex.: `https://studiodigital.netlify.app`), sem barra no final.
   - Os contatos reais (`whatsapp`, `email`, `profile.url`).
2. Faça commit e push. O site é publicado de novo automaticamente.
3. Teste o compartilhamento: cole o link em https://www.opengraph.xyz ou envie para você mesmo no WhatsApp.
   Deve aparecer a imagem `public/og-image.png`.

> Ao trocar o nome do portfólio, atualize também `monogram` em `site.ts`, o `public/favicon.svg` e a imagem
> de compartilhamento (abra `scripts/og-image.html` no navegador, edite o texto e tire um print de 1200×630,
> ou use uma ferramenta como o Canva).

---

## 4. Domínio próprio (futuramente)

1. Registre um domínio:
   - `.com.br`: https://registro.br (pago anualmente, exige CPF/CNPJ).
   - `.com`: Cloudflare Registrar, Namecheap, Porkbun etc.
2. **Netlify:** *Domain management → Add a domain*, digite o domínio e siga as instruções. A forma mais simples é
   apontar os **servidores DNS** do domínio para os da Netlify (no Registro.br: *Alterar servidores DNS*).
3. **Cloudflare Pages:** *Custom domains → Set up a custom domain*. Se o domínio já estiver na Cloudflare, a
   configuração é automática; caso contrário, crie o registro `CNAME` indicado.
4. O certificado HTTPS (cadeado) é emitido automaticamente e de graça nas duas plataformas.
5. Atualize `siteUrl` em `src/config/site.ts` para o novo domínio.

A propagação do DNS pode levar de alguns minutos a 24 horas.

---

## 5. Checklist antes de divulgar

- [ ] Contatos reais preenchidos em `src/config/site.ts` (ou deixados vazios, sem dados falsos)
- [ ] `siteUrl` preenchido com o endereço publicado
- [ ] Testado no celular: menu, botões, formulários e as quatro demonstrações
- [ ] Link direto testado (ex.: abrir `/demos/arena-store/carrinho` em uma aba nova)
- [ ] Planilha baixando em `/downloads/gestao360-planilha-exemplo.xlsx`
- [ ] Compartilhamento do link mostra a imagem de capa
