# Materiais para o 99Freelas

Textos prontos para cadastrar cada projeto no portfólio do 99Freelas e para citar nas propostas.
Todos identificam honestamente os trabalhos como **projetos demonstrativos autorais**.

> Substitua `SEU-SITE` pelo endereço publicado (ex.: `studiodigital.netlify.app`).
> As capturas de tela já estão prontas em [`docs/capturas/`](capturas/) (formato WebP; se a plataforma não aceitar
> WebP, abra no navegador e salve como PNG ou converta em https://squoosh.app).

---

## 1. Prime Imóveis — Portal imobiliário

**Título:** Portal imobiliário com catálogo, filtros e página de imóvel (projeto demonstrativo)

**Descrição comercial curta:**
Site para imobiliárias e corretores apresentarem imóveis de forma profissional. O visitante busca por palavra-chave,
filtra por cidade, tipo, finalidade, faixa de preço e quartos, e abre uma página completa de cada imóvel com galeria e
formulário de interesse. Projeto demonstrativo autoral com 12 imóveis fictícios.

**Problema resolvido:** imóveis divulgados apenas em redes sociais e grupos, sem organização, sem filtros e sem uma
página própria que transmita confiança.

**Funcionalidades:**
- Catálogo com 12 imóveis (dados fictícios)
- Busca por palavras-chave (bairro, característica, código)
- Filtros combináveis por cidade, tipo, compra/aluguel, faixa de preço e quartos
- Ordenação por preço e área; filtros salvos no endereço (link compartilhável)
- Página do imóvel com galeria navegável (mouse, toque e teclado)
- Quartos, banheiros, vagas, área, condomínio e diferenciais
- Formulário de interesse com validação e máscara de telefone
- Estado de “nenhum resultado” e layout responsivo

**Tecnologias:** React, TypeScript, React Router, Tailwind CSS, ilustrações em SVG.

**Link:** `https://SEU-SITE/demos/prime-imoveis`

**Sugestão de capa:** `public/projetos/prime-imoveis.webp` (catálogo com filtros e cards).

**Capturas recomendadas:**
1. `prime-catalogo-filtrado.webp` — catálogo com filtros aplicados (mostra a busca funcionando)
2. `prime-imovel-galeria.webp` — página do imóvel com galeria e formulário
3. `prime-celular.webp` — versão no celular

---

## 2. Gestão360 — Dashboard financeiro e comercial + planilha Excel

**Título:** Dashboard financeiro com indicadores, gráficos e exportação para Excel (projeto demonstrativo)

**Descrição comercial curta:**
Painel de gestão que transforma a lista de vendas e despesas em indicadores claros: receita, despesas, lucro estimado,
margem, quantidade de vendas e ticket médio, com comparação ao período anterior. Os filtros por período, tipo,
categoria e situação atualizam gráficos, tabela e indicadores ao mesmo tempo, e os dados filtrados podem ser exportados
para o Excel. Acompanha uma planilha XLSX com fórmulas, gráficos e listas de validação.

**Problema resolvido:** pequenas empresas com vendas e despesas espalhadas em cadernos ou planilhas soltas, sem
visão clara de lucro, margem e evolução mês a mês.

**Funcionalidades:**
- Indicadores calculados a partir de 1.155 transações fictícias (nada é digitado “à mão”)
- Comparação automática com o período anterior
- Gráfico de evolução mensal ou diária (receita, despesas e lucro)
- Receita por categoria (rosca) e despesas por categoria (barras)
- Filtros por período (inclusive datas personalizadas), tipo, categoria e situação
- Tabela com busca, ordenação e paginação
- Exportação CSV pronta para abrir no Excel (acentos e separadores corretos)
- Planilha XLSX: resumo anual com fórmulas SOMASES/CONT.SES, gráficos nativos e lançamentos com validação

**Tecnologias:** React, TypeScript, Recharts, Tailwind CSS, Python (openpyxl) para a planilha.

**Links:** `https://SEU-SITE/demos/gestao360` · planilha: `https://SEU-SITE/downloads/gestao360-planilha-exemplo.xlsx`

**Sugestão de capa:** `public/projetos/gestao360.webp` (visão geral com indicadores e gráfico).

**Capturas recomendadas:**
1. `gestao360-visao-geral.webp` — indicadores e filtros
2. `gestao360-graficos.webp` — gráficos de evolução e por categoria
3. `gestao360-celular.webp` — painel no celular
4. Um print da aba **Resumo** da planilha aberta no Excel (tire depois de baixar o arquivo — mostra fórmulas e gráficos)

> Ótimo exemplo para propostas de **planilhas, dashboards e relatórios**. Na proposta, mencione que entrega tanto o
> painel web quanto a planilha Excel.

---

## 3. Nova Serviços — Landing page de serviços

**Título:** Landing page para prestador de serviços com formulário de orçamento (projeto demonstrativo)

**Descrição comercial curta:**
Página de apresentação focada em transformar visitantes em pedidos de orçamento. Mostra serviços, vantagens e o passo
a passo do atendimento, responde dúvidas frequentes e traz um formulário validado. Pensada primeiro para o celular,
com botão de orçamento sempre à mão.

**Problema resolvido:** prestadores de serviço que perdem clientes porque a página não explica rápido o que fazem nem
facilita o pedido de orçamento no celular.

**Funcionalidades:**
- Hero com chamada para ação e destaques do serviço
- Seções de serviços, vantagens e “como funciona”
- Perguntas frequentes em acordeão acessível
- Formulário com validação por campo, máscara de telefone e foco no primeiro erro
- Revisão do pedido antes do envio, com abertura do aplicativo de e-mail
- Aviso transparente: a página não tem servidor e não simula envio
- Botão fixo de orçamento no celular

**Tecnologias:** React, TypeScript, Tailwind CSS, boas práticas de acessibilidade (ARIA).

**Link:** `https://SEU-SITE/demos/nova-servicos`

**Sugestão de capa:** `public/projetos/nova-servicos.webp` (hero da página).

**Capturas recomendadas:**
1. `nova-servicos-hero.webp` — primeira dobra
2. `nova-servicos-formulario-validacao.webp` — formulário mostrando as mensagens de validação
3. `nova-servicos-celular.webp` — versão no celular

> Em projetos reais, o formulário pode ser ligado a um serviço gratuito de formulários (ex.: Netlify Forms) ou ao
> WhatsApp da empresa. Explique isso na proposta.

---

## 4. Arena Store — Loja virtual demonstrativa

**Título:** Loja virtual de artigos esportivos com carrinho e checkout simulado (projeto demonstrativo)

**Descrição comercial curta:**
Loja virtual com experiência de compra completa: vitrine, categorias, página de produto com seleção de tamanho e
quantidade, carrinho lateral que calcula subtotal e frete e continua salvo ao fechar o navegador, e checkout
demonstrativo. Nenhum pagamento é integrado: o fluxo é identificado como simulação.

**Problema resolvido:** lojas que vendem apenas por mensagem e perdem tempo respondendo preço, tamanho e
disponibilidade, sem oferecer uma experiência de compra organizada.

**Funcionalidades:**
- Catálogo com 10 produtos fictícios e filtro por categoria
- Ordenação por preço e nome
- Página de produto com seleção obrigatória de tamanho e quantidade
- Carrinho lateral acessível (teclado e leitor de tela) e página de carrinho
- Adição, alteração de quantidade e remoção de itens
- Cálculo de subtotal, frete grátis acima de um valor e total
- Carrinho salvo no navegador (localStorage)
- Checkout com validação de dados de entrega, sem coleta de dados de pagamento

**Tecnologias:** React, TypeScript, React Router, Context API, localStorage, Tailwind CSS, ilustrações em SVG.

**Link:** `https://SEU-SITE/demos/arena-store`

**Sugestão de capa:** `public/projetos/arena-store.webp` (vitrine).

**Capturas recomendadas:**
1. `arena-vitrine.webp` — página inicial da loja
2. `arena-produto.webp` — produto com tamanho selecionado
3. `arena-carrinho-lateral.webp` — carrinho com subtotal e frete
4. `arena-checkout-simulado.webp` — checkout com o aviso de simulação
5. `arena-celular.webp` — loja no celular

> Em projetos reais de e-commerce, recomende plataformas prontas (ex.: Nuvemshop, Shopify) ou integração com um
> gateway de pagamento. Esta demonstração mostra domínio da interface e da lógica de carrinho.

---

## Texto base para propostas

Adapte ao projeto do cliente. Mantenha curto e específico.

> Olá, [nome]! Li a descrição do seu projeto e entendi que você precisa de [resumo da necessidade em uma frase].
>
> Posso desenvolver [solução] com [2 ou 3 funcionalidades principais que ele pediu]. Para você ter uma ideia da
> qualidade do trabalho, preparei projetos demonstrativos que podem ser abertos e testados:
> [link do projeto mais parecido] — [uma frase do que ele demonstra].
>
> Antes de começar, confirmo com você escopo, prazo e formato de entrega, e você acompanha prévias durante o
> desenvolvimento. Posso tirar algumas dúvidas rápidas sobre [ponto específico do projeto]?

**Dicas**
- Envie sempre o link da demonstração **mais parecida** com o pedido, não o portfólio inteiro.
- Para pedidos de planilha, envie a planilha XLSX e o link do Gestão360.
- Nunca chame os projetos demonstrativos de “clientes atendidos”. Use “projeto demonstrativo” ou “projeto autoral”.

## Texto curto para o perfil

> Desenvolvo sites, landing pages, planilhas inteligentes, dashboards e sistemas web para pequenos negócios. Uso
> ferramentas de IA como apoio para ganhar agilidade, sem abrir mão de testar e ajustar cada entrega. No meu
> portfólio há projetos demonstrativos funcionais (portal imobiliário, dashboard financeiro, landing page e loja
> virtual) que você pode abrir e testar: https://SEU-SITE
