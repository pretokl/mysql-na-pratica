# Fontes oficiais do tutorial

As capturas de tela das aulas foram selecionadas na documentação oficial do MySQL/Oracle. Elas mostram versões reais das interfaces; menus, dimensões e aparência podem variar conforme versão e sistema operacional.

## MySQL Workbench

- [Criar uma conexão no Workbench — Getting Started Tutorial](https://dev.mysql.com/doc/workbench/en/wb-getting-started-tutorial-create-connection.html). O tutorial parte de um MySQL Server instalado, iniciado e acessível; orienta abrir `MySQL Connections`, clicar em `+`, nomear a conexão, conferir os parâmetros e testar antes de salvar. A captura `workbench-connection.png` ilustra os campos de conexão.
- [Editor de consultas SQL](https://dev.mysql.com/doc/workbench/en/wb-sql-editor-query-panel.html). Descreve a área de edição, ferramentas e painéis de consulta. A imagem `workbench-sql-editor.png` é a referência para as aulas introdutórias ao editor.
- [Grade de resultados do SQL Editor](https://dev.mysql.com/doc/workbench/en/wb-develop-sql-editor-results.html). Explica que a área de resultados mostra as linhas devolvidas pelas instruções e descreve ações como atualizar, filtrar, editar, adicionar e excluir linhas. A imagem `workbench-results-grid.png` acompanha a aula de `SELECT`.
- [Modelos e diagramas EER — tutorial](https://dev.mysql.com/doc/workbench/en/wb-getting-started-tutorial-creating-a-model.html). Fonte da tela do editor EER mostrada nas aulas de entidades, atributos e relacionamentos.

## Instalação do MySQL no Windows

- [MySQL Installer — configuração inicial](https://dev.mysql.com/doc/mysql-installer/en/mysql-installer-setup.html). Documenta seleção de produtos e tipos de configuração do MySQL Installer.
- [MySQL Installer — seleção de produtos e caminhos](https://dev.mysql.com/doc/mysql-installer/en/mysql-installer-change-path-proc.html). Fonte direta da captura da seleção de produtos.
- [Instalação do MySQL no Windows](https://dev.mysql.com/doc/en/windows-installation.html). Identifica o MSI e o MySQL Configurator como fluxo recomendado para Windows. A captura `mysql-installer-products-windows.png` é apenas uma ilustração dessa plataforma; ela não representa as telas de instalação do macOS ou Linux.
- [Downloads oficiais do MySQL Server](https://dev.mysql.com/downloads/mysql/) e [MySQL Workbench](https://dev.mysql.com/downloads/workbench/).

## Limites das demonstrações

O SQL exibido na bancada é uma simulação educativa. Não é enviado a um servidor nem reproduz toda a gramática MySQL. Os resultados da tabela são amostras inventadas para o curso; somente operações CRUD simples selecionadas alteram essas amostras no navegador. DDL e outros comandos reconhecidos apenas recebem uma explicação.


## GitHub Pages

- [Configurar uma fonte de publicação do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). A documentação distingue publicação por branch de workflow personalizado e descreve como selecionar GitHub Actions como fonte.
- [Usar workflows personalizados com GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). A publicação por Actions empacota os arquivos estáticos como artefato e os implanta no ambiente `github-pages`; o job de deploy requer permissões `pages: write` e `id-token: write`.
- [REST API do GitHub Pages](https://docs.github.com/en/rest/pages/pages). A API permite configurar o tipo de build do Pages como `workflow`.
- Actions oficiais usadas pelo workflow: [checkout](https://github.com/actions/checkout), [setup-node](https://github.com/actions/setup-node), [pnpm/action-setup](https://github.com/pnpm/action-setup), [configure-pages](https://github.com/actions/configure-pages), [upload-pages-artifact](https://github.com/actions/upload-pages-artifact) e [deploy-pages](https://github.com/actions/deploy-pages).
