# Atualização visual — MySQL na Prática

## Direções consideradas
- Neo-noir editorial de software: 0,08.
- Brutalismo de laboratório independente: 0,06.
- Arquivo técnico futurista: 0,04.

**Direção escolhida:** neo-noir editorial — um caderno de laboratório impresso sobre uma bancada escura, com personalidade de publicação independente.

## Decisões de design

**Movimento:** neo-noir editorial com referências à sinalização industrial e aos cadernos de código impressos.

**Princípios centrais:** leitura clara; contraste elevado sem texto apagado; cor quente como código de navegação; simplicidade didática e avisos seguros preservados.

**Filosofia de cor:** carvão quase preto para o espaço de trabalho; papel escuro quente nos painéis; laranja de brasa para ações e progresso; vermelho vivo para acentos e estados ativos; marfim para leitura longa. Verde e lilás pastel deixam de dominar a interface.

**Paradigma de layout:** substituir a barra lateral permanente por um cabeçalho de navegação largo, dividido em marca, trilha horizontal e progresso. Em telas pequenas, trocar esse cabeçalho por uma dock de ícones fixa no rodapé. Nas aulas, preservar o índice vertical como navegação contextual. Usar alinhamentos editoriais assimétricos e seções de ritmo variável, em vez de um dashboard centralizado convencional.

**Elementos distintivos:** numeração monoespaçada grande; filetes laranja/vermelhos e cantos técnicos; campos escuros com grafismos geométricos discretos.

**Filosofia de interação:** sinalizar a localização atual pela cor e pelo filete de borda, sem depender apenas de texto; manter rótulos diretos, áreas de toque confortáveis no celular, foco de teclado visível e avisos de segurança com contraste próprio. A barra móvel deixa as quatro áreas sempre acessíveis.

**Animação:** transições curtas para estados de hover/foco e mudanças de página, sem movimento ornamental obrigatório; respeitar `prefers-reduced-motion`.

**Tipografia:** Space Grotesk para títulos e controles; IBM Plex Mono para rótulos, números e SQL; fontes de sistema como fallback.

**Essência da marca:** bancada de aprendizagem SQL para quem prefere entender a lógica antes de decorar comandos — curiosa, acessível, corajosa.

**Voz:** direta, acolhedora e curiosa. Exemplos: “Uma tabela por vez. Um mapa mais claro.” e “Seu próximo comando começa aqui.”

**Wordmark e símbolo:** preservar o wordmark MySQL e redesenhar o símbolo SVG como um cilindro de banco de dados com seta de avanço, usando carvão, vermelho e laranja.

**Cor proprietária:** laranja de brasa, equilibrado por carvão e vermelho.

## Implementação e estrutura

O projeto permanece uma aplicação React/TypeScript/Vite estática. O conteúdo didático, exercícios, laboratório simulado, progresso local e rotas permanecem inalterados. A navegação é reorganizada em `src/components/Sidebar.tsx`; a folha dedicada `src/editorial-theme.css`, carregada por `src/main.tsx` após `src/index.css`, aplica os novos tokens, componentes e breakpoints sem reescrever a lógica das páginas. O SVG de marca atualizado fica em `public/mysql-na-pratica-logo.svg` e a URL durável de branding é registrada em `app.config.ts`. Não são adicionados serviços, backend ou coleta de dados pessoais.

## Organização atual

- `src/App.tsx`: estado compartilhado, composição das páginas e cabeçalho.
- `src/components/Sidebar.tsx`: navegação principal e progresso.
- `src/components/Dashboard.tsx`: resumo, próxima aula e níveis.
- `src/components/CoursePage.tsx` e `ExerciseCard.tsx`: índice das aulas, material, capturas e exercícios.
- `src/components/LabPage.tsx`: editor de demonstração em memória, sem conexão a servidor.
- `src/components/ProjectsPage.tsx`: exemplos de esquemas e SQL.
- `src/index.css` e `src/editorial-theme.css`: estilos-base e tema neo-noir responsivo.
- `src/data/`: conteúdo de aulas e projetos.
- `public/`: logo e capturas oficiais do MySQL Workbench.