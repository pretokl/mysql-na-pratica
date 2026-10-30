# MySQL na Prática

Aplicativo didático em português para aprender a planejar bancos de dados, usar MySQL Server com MySQL Workbench e praticar SQL em etapas.

## Iniciar localmente

```bash
pnpm install
pnpm dev
```

A aplicação roda em `http://localhost:3000`. O Preview local e o do Manus usam a raiz `/`; as capturas oficiais são lidas de `public/images`, sem exigir chave de armazenamento.

## Publicar com GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` executa checagem TypeScript, build e deploy no GitHub Pages quando há push para `main`, ou quando iniciado manualmente. No CI, `VITE_BASE_PATH=/mysql-na-pratica/` configura os caminhos para o project site; localmente o padrão continua `/`. O artefato publicado é `dist/`. O workflow não precisa de tokens ou segredos próprios.

## O que está incluído

A trilha tem cinco níveis, da modelagem de dados a consultas, alterações, views e uma introdução a procedures. Há exercícios de múltipla escolha, completar comandos, identificar riscos e escrever uma consulta. Quatro projetos prontos demonstram estruturas para escola, RH, restaurante e biblioteca. As capturas oficiais incluem telas do MySQL Installer para Windows, criação de conexão, modelagem EER, editor SQL e grade de resultados. As fontes estão em [REFERENCIAS.md](./REFERENCIAS.md), e cada aula liga para o manual oficial relacionado.

O progresso do curso e as pontuações ficam salvos no armazenamento local do navegador. Não há conta de estudante nem banco de dados da aplicação.

## Bancada SQL

A bancada **não se conecta ao MySQL Server do computador**, não executa SQL arbitrário e nunca altera dados reais. O SELECT mostra linhas fictícias; comandos simples de INSERT, UPDATE e DELETE modificam apenas essas amostras no armazenamento de sessão deste navegador. O botão “Restaurar a amostra fictícia” volta ao ponto inicial. Operações de criação de bancos e tabelas são explicações simuladas, sem objetos reais no servidor. Revise os comandos antes de executá-los em uma instalação MySQL.

## Referências visuais

As capturas do aplicativo são exemplos de telas reais documentadas pela Oracle/MySQL. O MySQL Installer mostrado é específico para Windows: os passos e as telas de macOS e Linux são diferentes. As versões das capturas podem diferir da interface atualmente instalada.

## Tecnologia

React, TypeScript e Vite. O logo e as capturas fazem parte do próprio repositório em `public/`, de modo que o site estático não depende do proxy de armazenamento privado usado anteriormente no Preview. A aplicação não requer backend próprio, cadastro de estudante ou chave de API fornecida pelo usuário.
