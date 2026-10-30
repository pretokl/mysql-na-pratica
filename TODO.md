# TODO — MySQL na Prática

## 1. Trilha didática e aulas passo a passo
- [x] “Crie um programa que me ensine passo a passo como utilizar o Mysql-server junto ao Mysql_Workbench.”
- [x] “Quero que o programa seja muito intuitivo e didático. Que ensine de tal forma que pessoas de qualquer idade possa compreender.”
- [x] Organizar a aprendizagem por níveis, começando com fundamentos de Modelagem e Desenvolvimento de Banco de Dados e avançando até projetos completos em MySQL.
- [x] Incluir tutoriais de instalação, configuração, conexão e uso conjunto do MySQL Server e do MySQL Workbench.
- [x] Explicar entidades, atributos, relacionamentos, cardinalidade, chaves primárias e estrangeiras, normalização e integridade com vocabulário simples.

## 2. Demonstrações visuais do MySQL Workbench
- [x] “Que ensine ... nas aulas, imagens baseadas nas aplicações reais.”
- [x] Exibir capturas oficiais em aulas de instalação, conexão, modelagem, edição SQL e resultados, com links para fontes oficiais e indicação de variações entre versões e plataformas. A tela do MySQL Installer está marcada como exemplo específico do Windows.

## 3. Laboratório SQL e exercícios de fixação
- [x] Oferecer laboratório interativo com resultados simulados, mensagens claras e explicação de que não se conecta ao MySQL Server do computador.
- [x] Permitir que INSERT, UPDATE e DELETE simples alterem apenas amostras fictícias locais, com condição WHERE em atualizações/exclusões e opção para restaurar os dados iniciais.
- [x] Incluir exercícios ao fim das aulas: múltipla escolha, completar comandos, identificar erros e desafios práticos.
- [x] Incluir explicações, pistas graduais e comentários úteis para que o aluno entenda os conceitos e comandos.

## 4. Progresso de aprendizagem
- [x] Acompanhar progresso por aula e nível, com conteúdo concluído, desempenho em exercícios e indicação do próximo passo; salvar o progresso localmente no navegador.

## 5. Projetos de bancos de dados por contexto
- [x] “Também que tenha níveis de aprendizagem e exercícios de fixação. Os primeiros níveis podem ser baseados na disciplina de Modelagem e Desenvolvimento de Banco de Dados. E ao longo das aulas, vá se aprofundando na criação de banco de dados. Que tenha opções de criação de banco de dados.”
- [x] Oferecer projetos e estruturas de exemplo para escolas, empresas com RH, restaurantes e outros contextos cotidianos.
- [x] Ensinar a modelar, implementar, popular e consultar bancos completos, incluindo criação de schemas e tabelas, relacionamentos, restrições, consultas, inserções, atualizações, exclusões, views e procedimentos básicos; manter diagramas visuais coerentes com o SQL dos projetos.

## 6. Redesenho visual solicitado
- [x] “Mude para o layout para algo mais moderno, porém menos conhecido. Também mude as disposições dos menus e altere a palheta de cores para algo mais laranja com vermelho e preto.” Aplicar uma identidade mais moderna e distinta, reorganizar a posição dos menus, priorizar preto/carvão, laranja e vermelho sem comprometer contraste e legibilidade, e manter responsividade e acesso às mesmas funções do curso. A navegação fica horizontal no desktop e fixa no rodapé em celulares; o menu é visível nos breakpoints mobile e a paleta está aplicada aos controles, cartões e superfícies.

## 7. Repositório público e GitHub Pages
- [x] “Troque por repositório publico, pois eu quero postar usando gitpages.” Tornar público o repositório `pretokl/mysql-na-pratica` e configurar o GitHub Pages para publicar a aplicação estática aprovada pelo usuário.
- [x] Fazer o build do Vite funcionar no subdiretório `/mysql-na-pratica/`, publicar em `dist/` por GitHub Actions e garantir que logo e capturas oficiais das aulas carreguem sem depender do proxy privado do Preview.
- [x] Preservar o repositório canônico Manus e o remote GitHub em paralelo; não substituir nem sobrescrever nenhum remote existente.
