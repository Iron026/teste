# Notas para agentes e colaboradores

- Stack: **Vite + React 19 + TypeScript + Tailwind CSS 4 + React Router 7** (site estático; não é Next.js).
- Comandos: `npm run dev`, `npm run build` (inclui `tsc -b`), `npm run preview`.
- Conteúdo editável fica em `src/config/site.ts` e `src/data/*`. Não espalhe textos nos componentes.
- Cada demonstração fica isolada em `src/demos/<projeto>/` e é carregada sob demanda em `src/App.tsx`.
- Todo conteúdo é em português do Brasil. Projetos são demonstrativos: não invente clientes, depoimentos, números
  de resultado nem contatos.
- Formulários não têm backend: nunca simule um envio como se tivesse ocorrido.
