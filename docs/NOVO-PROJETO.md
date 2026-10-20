# Como cadastrar um novo projeto no portfólio

Os projetos ficam todos em **um único arquivo**: `src/data/projects.ts`. Cada item da lista gera automaticamente:

- um card na seção **Projetos** da página inicial;
- uma página de apresentação em `/projetos/<slug>`;
- um link no rodapé.

Não é preciso editar nenhum componente.

## Passo a passo

### 1. Prepare a imagem de capa

- Tire uma captura de tela do projeto (de preferência 1600 × 1000 px, proporção 16:10).
- Converta para **WebP** (menor e mais rápido). Ferramenta gratuita: https://squoosh.app (qualidade ~80).
- Salve em `public/projetos/`, por exemplo `public/projetos/agenda-salao.webp`.

### 2. Adicione o projeto em `src/data/projects.ts`

Copie um dos objetos existentes e ajuste os campos. Exemplo:

```ts
{
  slug: 'agenda-salao',                       // endereço: /projetos/agenda-salao (sem espaços ou acentos)
  name: 'Agenda do Salão',
  category: 'Sistema web',
  summary: 'Agenda on-line para salões com confirmação de horários.',
  description: 'Sistema simples para organizar horários de atendimento e evitar conflitos de agenda.',
  problem: 'O salão anotava horários em papel e havia conflitos e esquecimentos.',
  solution: 'Uma agenda on-line com visualização por dia e por profissional e lembretes.',
  features: [
    'Cadastro de horários por profissional',
    'Visualização diária e semanal',
    'Busca de clientes',
  ],
  technologies: ['React', 'TypeScript', 'Tailwind CSS'],
  demoUrl: 'https://agenda-salao.netlify.app', // link externo OU rota interna, ex.: '/demos/agenda-salao'
  cover: '/projetos/agenda-salao.webp',
  coverAlt: 'Tela da agenda semanal do sistema Agenda do Salão',
  accent: '#0EA5E9',                          // cor de destaque do card
  demonstrative: true,                        // true = mostra o selo "Projeto demonstrativo"
},
```

Campos opcionais: `download` (ex.: um arquivo em `public/downloads/`).

### 3. Quando for um projeto real de cliente

- Troque `demonstrative` para `false` **somente** se o trabalho foi de fato entregue a um cliente.
- Peça autorização ao cliente antes de publicar nome, imagens ou dados.
- Não inclua números de resultado que você não possa comprovar.

### 4. (Opcional) Criar a demonstração dentro deste site

1. Crie uma pasta em `src/demos/<nome>/` com a página principal (ex.: `MinhaDemoPage.tsx`, com `export default`).
2. No topo da página, use `<DemoBar projectSlug="..." projectName="..." />` para identificar a demonstração.
3. Registre a rota em `src/App.tsx`:

   ```tsx
   const MinhaDemoPage = lazy(() => import('@/demos/minha-demo/MinhaDemoPage'))
   // ...
   <Route path="demos/minha-demo" element={<MinhaDemoPage />} />
   ```

4. Use `demoUrl: '/demos/minha-demo'` no `projects.ts`.

### 5. Confira e publique

```bash
npm run dev     # confira o card e a página do projeto
npm run build   # garante que não há erros
git add . && git commit -m "Adiciona projeto Agenda do Salão" && git push
```

## Outros conteúdos editáveis

| Conteúdo | Arquivo |
| --- | --- |
| Serviços (ícone, texto, aplicações, projeto relacionado) | `src/data/services.ts` |
| Etapas do processo | `src/data/process.ts` |
| Perguntas frequentes | `src/data/faq.ts` |
| Texto “Sobre” e valores | `src/data/about.ts` |
| Tecnologias | `src/data/technologies.ts` |
| Nome, descrição, hero e contatos | `src/config/site.ts` |

Ícones disponíveis: https://lucide.dev/icons — importe pelo nome em PascalCase, por exemplo
`import { CalendarDays } from 'lucide-react'`.
