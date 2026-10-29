# MySQL na Prática

Aplicativo didático em português para aprender a planejar bancos de dados, usar MySQL Server com MySQL Workbench e praticar SQL em etapas.

## Iniciar localmente

```bash
pnpm install
pnpm dev
```

A aplicação roda em `http://localhost:3000`. As capturas usadas como exemplos são servidas de `public/images` durante o desenvolvimento local; não é preciso configurar uma chave ou conta de armazenamento.

## O que está incluído

A trilha tem cinco níveis, da modelagem de dados a consultas, alterações, views e uma introdução a procedures. Há exercícios de múltipla escolha, completar comandos, identificar riscos e escrever uma consulta. Quatro projetos prontos demonstram estruturas para escola, RH, restaurante e biblioteca. As capturas oficiais incluem telas do MySQL Installer para Windows, criação de conexão, modelagem EER, editor SQL e grade de resultados. As fontes estão em [REFERENCIAS.md](./REFERENCIAS.md), e cada aula liga para o manual oficial relacionado.

O progresso do curso e as pontuações ficam salvos no armazenamento local do navegador. Não há conta de estudante nem banco de dados da aplicação.

## Bancada SQL

A bancada **não se conecta ao MySQL Server do computador**, não executa SQL arbitrário e nunca altera dados reais. O SELECT mostra linhas fictícias; comandos simples de INSERT, UPDATE e DELETE modificam apenas essas amostras no armazenamento de sessão deste navegador. O botão “Restaurar a amostra fictícia” volta ao ponto inicial. Operações de criação de bancos e tabelas são explicações simuladas, sem objetos reais no servidor. Revise os comandos antes de executá-los em uma instalação MySQL.

## Referências visuais

As capturas do aplicativo são exemplos de telas reais documentadas pela Oracle/MySQL. O MySQL Installer mostrado é específico para Windows: os passos e as telas de macOS e Linux são diferentes. As versões das capturas podem diferir da interface atualmente instalada.

## Tecnologia

React, TypeScript e Vite. As imagens do curso também estão armazenadas como ativos privados do projeto WebDev, usando caminhos `/manus-storage/`; o proxy Vite do projeto recupera essas imagens na prévia gerenciada. A aplicação não requer backend próprio, cadastro de estudante ou chave de API fornecida pelo usuário.
