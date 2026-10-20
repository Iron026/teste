# Studio Digital — Portfólio de desenvolvimento e soluções digitais

Portfólio profissional com **quatro projetos demonstrativos funcionais**:

| Projeto | O que demonstra | Rota |
| --- | --- | --- |
| **Prime Imóveis** | Portal imobiliário: catálogo com 12 imóveis, busca, filtros, página do imóvel com galeria | `/demos/prime-imoveis` |
| **Gestão360** | Dashboard financeiro: indicadores calculados, gráficos, filtros, tabela e exportação CSV + planilha XLSX | `/demos/gestao360` |
| **Nova Serviços** | Landing page de serviços mobile-first com formulário de orçamento validado | `/demos/nova-servicos` |
| **Arena Store** | Loja virtual: catálogo, tamanhos, quantidade, carrinho persistente e checkout simulado | `/demos/arena-store` |

> Todos os projetos são **demonstrativos e autorais**. Empresas, imóveis, produtos, transações e valores são fictícios.
> Nenhum formulário envia dados para servidores e nenhuma compra é processada.

---

## Tecnologias

- **React 19 + TypeScript** — interface e tipagem
- **Vite** — servidor de desenvolvimento e build (site estático)
- **Tailwind CSS 4** — estilos
- **React Router 7** — navegação entre páginas e demonstrações
- **Recharts** — gráficos do dashboard
- **Lucide React** — ícones
- **Fontsource** — fontes Inter, Manrope, Fraunces e JetBrains Mono hospedadas junto com o site (sem depender do Google Fonts)
- **Python + openpyxl** — geração da planilha XLSX de exemplo

Tudo é gratuito e de código aberto. Não há banco de dados, API paga ou chave secreta.

> O repositório começou com um esqueleto vazio de Next.js. Ele foi substituído por Vite porque o site é 100% estático,
> e o Vite é mais simples de publicar de graça (Netlify / Cloudflare Pages) e de manter — exatamente a stack pedida.

---

## Como rodar no seu computador

Pré-requisito: [Node.js](https://nodejs.org) **20 ou superior** (recomendado: 22 LTS).

```bash
npm install        # instala as dependências (uma vez)
npm run dev        # abre em http://localhost:5173 e atualiza ao salvar
npm run build      # gera a versão de produção na pasta dist/
npm run preview    # testa localmente a versão de produção
```

---

## Onde editar cada coisa

| Quero alterar… | Arquivo |
| --- | --- |
| Nome, descrição, título do hero, **WhatsApp, e-mail, perfil** | `src/config/site.ts` |
| Serviços | `src/data/services.ts` |
| **Projetos do portfólio** | `src/data/projects.ts` (passo a passo em [`docs/NOVO-PROJETO.md`](docs/NOVO-PROJETO.md)) |
| Etapas de “Como trabalho” | `src/data/process.ts` |
| Perguntas frequentes | `src/data/faq.ts` |
| Texto “Sobre” | `src/data/about.ts` |
| Lista de tecnologias | `src/data/technologies.ts` |
| Cores e fontes | `src/index.css` (bloco `@theme`) |
| Favicon / imagem de compartilhamento | `public/favicon.svg`, `public/og-image.png` (modelo em `scripts/og-image.html`) |

### Contatos (importante)

Os contatos estão **vazios de propósito**. Enquanto estiverem vazios, o site não exibe nenhum contato fictício: mostra
um aviso honesto e permite copiar a mensagem do formulário. Para ativar, preencha em `src/config/site.ts`:

```ts
contact: {
  whatsapp: '5511999999999',          // DDI + DDD + número, só dígitos
  email: 'seuemail@exemplo.com',
  profile: { label: 'Perfil no 99Freelas', url: 'https://www.99freelas.com.br/user/seu-usuario' },
  extraLinks: [{ label: 'GitHub', url: 'https://github.com/seu-usuario' }],
}
```

Com e-mail configurado, o formulário de contato abre o aplicativo de e-mail do visitante com a mensagem pronta.
Com WhatsApp configurado, aparece também o botão “Enviar pelo WhatsApp”.

Depois de publicar, preencha também `siteUrl` (ex.: `https://studiodigital.netlify.app`) para que a imagem de
compartilhamento funcione no WhatsApp e no LinkedIn.

---

## Estrutura de pastas

```
├── public/                     arquivos servidos como estão
│   ├── _redirects              rotas do SPA (Netlify e Cloudflare Pages)
│   ├── downloads/              planilha XLSX de exemplo
│   ├── projetos/               capas dos projetos (.webp)
│   ├── favicon.svg, apple-touch-icon.png, og-image.png, robots.txt
├── scripts/
│   ├── gerar_planilha_gestao360.py   gera a planilha XLSX (openpyxl)
│   ├── exportar-transacoes.mjs       exporta os dados do dashboard para a planilha
│   ├── gerar-capas.mjs               gera as capas a partir das demos (opcional)
│   └── og-image.html                 modelo da imagem de compartilhamento
├── src/
│   ├── config/site.ts          ⭐ configuração central
│   ├── data/                   ⭐ conteúdo: serviços, projetos, FAQ, sobre…
│   ├── components/
│   │   ├── layout/             cabeçalho, rodapé, faixa de demonstração
│   │   ├── home/               seções da página inicial
│   │   └── ui/                 botões, campos, acordeão, logo…
│   ├── pages/                  página inicial, página de projeto, 404
│   ├── demos/                  uma pasta por projeto demonstrativo
│   │   ├── prime-imoveis/
│   │   ├── gestao360/
│   │   ├── nova-servicos/
│   │   └── arena-store/
│   ├── hooks/                  SEO, localStorage, animações
│   ├── lib/                    formatação, validação, CSV, contato
│   ├── App.tsx                 rotas
│   └── index.css               tema visual (cores, fontes)
├── docs/                       publicação, novo projeto, materiais 99Freelas
├── netlify.toml                configuração do Netlify
└── index.html                  metadados (preenchidos a partir de site.ts)
```

---

## Publicação gratuita

Passo a passo completo (GitHub, Netlify, Cloudflare Pages e domínio próprio): [`docs/PUBLICACAO.md`](docs/PUBLICACAO.md).

Resumo: comando de build `npm run build`, pasta publicada `dist`. As rotas internas já estão configuradas
(`public/_redirects` e `netlify.toml`), então atualizar a página em `/demos/gestao360` não dá erro 404.

## Planilha XLSX

`public/downloads/gestao360-planilha-exemplo.xlsx` — abas Resumo (indicadores, tabela mensal, categorias e gráficos),
Lançamentos (1.155 transações em tabela com listas de validação), Categorias e Instruções. Todos os totais são fórmulas.

Para regerar:

```bash
node --experimental-strip-types scripts/exportar-transacoes.mjs   # opcional: só se mudar os dados do dashboard
pip install openpyxl
python scripts/gerar_planilha_gestao360.py
```

## Materiais para o 99Freelas

Títulos, descrições, funcionalidades e orientações de capturas de tela para cada projeto:
[`docs/99FREELAS.md`](docs/99FREELAS.md).

## Qualidade verificada

- Build de produção e checagem de tipos (`npm run build`) sem erros.
- 14 rotas verificadas em desktop (1366 px) e celular (390 px): sem erros de console e sem rolagem horizontal.
- Auditoria automática de acessibilidade (axe-core, WCAG 2 AA) nas mesmas rotas.
- Fluxos testados em navegador: filtros e exportação do dashboard, formulário da landing page, compra completa na loja
  (tamanho obrigatório, carrinho, persistência após recarregar, checkout simulado).
- Planilha: 1.284 fórmulas recalculadas sem erros; totais conferidos com o dashboard.
