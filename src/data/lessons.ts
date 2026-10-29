export type ExerciseKind = 'choice' | 'fill' | 'spot' | 'challenge';

export type Exercise = {
  kind: ExerciseKind;
  prompt: string;
  choices?: string[];
  answer: string;
  feedback: string;
  hint: string;
  code?: string;
  placeholder?: string;
};

export type LessonStep = {
  title: string;
  body: string;
  code?: string;
  note?: string;
};

export type Lesson = {
  id: string;
  level: number;
  title: string;
  summary: string;
  minutes: number;
  image?: 'eer' | 'sql' | 'install' | 'connection' | 'results';
  steps: LessonStep[];
  exercise: Exercise;
};

export const LEVELS = [
  { id: 1, title: 'Organizar as ideias', subtitle: 'Modelagem antes de criar', color: 'mint' },
  { id: 2, title: 'Preparar o ambiente', subtitle: 'Server e Workbench', color: 'blue' },
  { id: 3, title: 'Construir o banco', subtitle: 'Schemas, tabelas e relações', color: 'lilac' },
  { id: 4, title: 'Conversar com os dados', subtitle: 'Consultar e cuidar', color: 'orange' },
  { id: 5, title: 'Dar o próximo passo', subtitle: 'Views e rotinas', color: 'rose' },
] as const;

export const LESSONS: Lesson[] = [
  {
    id: 'dados-e-banco', level: 1, title: 'O que é um banco de dados?', summary: 'Conheça a diferença entre informação, tabela e banco de dados.', minutes: 5,
    steps: [
      { title: 'Comece por algo conhecido', body: 'Pense na lista de alunos de uma turma. Cada linha representa uma pessoa; cada coluna guarda uma informação, como nome ou e-mail.' },
      { title: 'Junte informações relacionadas', body: 'Um banco de dados organiza várias tabelas que precisam conversar entre si. Em uma escola, por exemplo, alunos, turmas e matrículas fazem parte do mesmo conjunto.' },
      { title: 'Duas ferramentas, dois papéis', body: 'O MySQL Server guarda os dados e responde aos pedidos. O MySQL Workbench é a ferramenta visual que ajuda você a se conectar, desenhar e enviar comandos ao servidor.', note: 'A interface pode variar um pouco entre versões. O conceito continua o mesmo.' },
    ],
    exercise: { kind: 'choice', prompt: 'Qual ferramenta guarda e administra os dados?', choices: ['MySQL Server', 'MySQL Workbench', 'O arquivo de imagem do diagrama'], answer: 'MySQL Server', feedback: 'Isso mesmo. O Server é quem armazena e processa os dados.', hint: 'Procure a peça que funciona mesmo quando o Workbench está fechado.' },
  },
  {
    id: 'entidades-atributos', level: 1, title: 'Transformar ideias em tabelas', summary: 'Descubra entidades e atributos sem precisar decorar palavras difíceis.', minutes: 6, image: 'eer',
    steps: [
      { title: 'Encontre as coisas importantes', body: 'Uma entidade é algo sobre o qual queremos guardar informações. Numa escola, “aluno” e “curso” são entidades.' },
      { title: 'Liste o que queremos saber', body: 'Os atributos descrevem uma entidade. Um aluno pode ter nome, e-mail e data de nascimento. Cada atributo vira uma coluna.' },
      { title: 'Olhe o desenho do Workbench', body: 'No diagrama EER, cada caixa representa uma tabela. Dentro dela aparecem as colunas e seus tipos. O desenho ajuda a revisar o plano antes de construir o banco.', note: 'EER quer dizer diagrama Entidade-Relacionamento Aprimorado. O manual oficial apresenta esse editor visual.' },
    ],
    exercise: { kind: 'choice', prompt: 'Na tabela “alunos”, o campo “e-mail” é...', choices: ['Um atributo (coluna)', 'Um relacionamento', 'Um banco separado'], answer: 'Um atributo (coluna)', feedback: 'Exato. “E-mail” descreve cada aluno, então é um atributo.', hint: 'A entidade é a “coisa”; o atributo descreve essa coisa.' },
  },
  {
    id: 'relacionamentos', level: 1, title: 'Ligar tabelas sem repetir tudo', summary: 'Entenda relacionamentos e cardinalidade usando exemplos cotidianos.', minutes: 7, image: 'eer',
    steps: [
      { title: 'Observe a vida real', body: 'Uma turma pode ter muitos alunos, e cada aluno pode participar de várias turmas em momentos diferentes. O banco precisa representar essas ligações.' },
      { title: 'Leia a cardinalidade', body: 'Cardinalidade descreve quantas ocorrências podem se ligar: uma para uma, uma para muitas ou muitas para muitas.' },
      { title: 'Use uma tabela de ligação', body: 'Uma relação muitos-para-muitos costuma virar uma tabela intermediária. “matriculas” pode ligar alunos a turmas e ainda guardar a data da matrícula.', code: 'alunos  1 ─── N  matriculas  N ─── 1  turmas' },
    ],
    exercise: { kind: 'choice', prompt: 'Uma pessoa pode fazer vários cursos, e cada curso pode ter várias pessoas. Que tipo de relação é essa?', choices: ['Um para um', 'Um para muitos', 'Muitos para muitos'], answer: 'Muitos para muitos', feedback: 'Correto. Cada lado pode se relacionar com vários registros do outro lado.', hint: 'Conte quantos cursos uma pessoa pode fazer e quantas pessoas um curso pode ter.' },
  },
  {
    id: 'chaves', level: 1, title: 'Chaves: o endereço de cada registro', summary: 'Use chaves primárias e estrangeiras para encontrar e conectar linhas.', minutes: 6, image: 'eer',
    steps: [
      { title: 'Dê um identificador único', body: 'A chave primária identifica uma linha sem confundir pessoas com o mesmo nome. É comum usar um número que aumenta automaticamente.' },
      { title: 'Aponte para outra tabela', body: 'A chave estrangeira guarda a chave primária de outra tabela. Assim, uma matrícula pode indicar exatamente qual aluno e qual turma estão ligados.' },
      { title: 'Confira as siglas', body: 'No editor de tabelas do Workbench, PK indica chave primária. FK identifica uma chave estrangeira. Essas regras ajudam a manter os vínculos corretos.', code: 'alunos.id_aluno  ←  matriculas.id_aluno (FK)' },
    ],
    exercise: { kind: 'spot', prompt: 'Em uma matrícula, qual campo deveria apontar para o aluno relacionado?', choices: ['id_aluno (chave estrangeira)', 'nome_turma (texto repetido)', 'a cor da janela do Workbench'], answer: 'id_aluno (chave estrangeira)', feedback: 'Isso. A chave guarda uma referência confiável ao registro do aluno.', hint: 'Escolha um valor que identifique o aluno sem depender de digitar seu nome de novo.' },
  },
  {
    id: 'organizar-dados', level: 1, title: 'Evitar cópias e confusão', summary: 'Veja como separar dados para reduzir repetição e erros de atualização.', minutes: 6,
    steps: [
      { title: 'Perceba a repetição', body: 'Se o endereço da escola aparece em cada linha de todos os alunos, uma mudança exige muitas correções e pode deixar dados diferentes.' },
      { title: 'Separe o que tem vida própria', body: 'A normalização é uma maneira de organizar as tabelas para reduzir repetições e dependências estranhas. Informações sobre turmas ficam em “turmas”; dados de alunos ficam em “alunos”.' },
      { title: 'Ligue as partes com chaves', body: 'Separar não significa perder a ligação. As chaves primárias e estrangeiras permitem juntar as informações quando precisar.' },
    ],
    exercise: { kind: 'choice', prompt: 'Se o endereço de uma turma está repetido em todas as matrículas, qual é uma boa primeira melhoria?', choices: ['Criar uma tabela “turmas” e guardar o endereço nela', 'Apagar os nomes dos alunos', 'Colocar todos os dados em uma única coluna'], answer: 'Criar uma tabela “turmas” e guardar o endereço nela', feedback: 'Boa escolha. A informação da turma fica em um só lugar e as matrículas apontam para ela.', hint: 'Pense em qual entidade é dona daquela informação.' },
  },
  {
    id: 'instalar-ferramentas', level: 2, title: 'Conhecer as duas peças', summary: 'Prepare o MySQL Server e o MySQL Workbench para trabalharem juntos.', minutes: 8, image: 'install',
    steps: [
      { title: 'Instale primeiro o servidor', body: 'Escolha a edição adequada ao seu sistema operacional na página oficial do MySQL. Durante a configuração, guarde com cuidado a senha definida para o usuário administrador.' },
      { title: 'Instale a bancada visual', body: 'Baixe o MySQL Workbench na página oficial. Ele pode ser instalado na mesma máquina, mas é um aplicativo diferente do Server.' },
      { title: 'Confira se o serviço está ativo', body: 'O Workbench não substitui o servidor. Antes de abrir uma conexão, confirme que o serviço MySQL foi iniciado pelo instalador ou pelo serviço do seu sistema operacional.', note: 'Os passos e telas do instalador variam entre Windows, macOS e Linux. Use a documentação oficial para a versão do seu sistema.' },
    ],
    exercise: { kind: 'choice', prompt: 'Qual sequência descreve melhor a relação entre os aplicativos?', choices: ['O Workbench envia pedidos ao MySQL Server', 'O MySQL Server é só um tema do Workbench', 'O Workbench guarda os dados mesmo sem servidor'], answer: 'O Workbench envia pedidos ao MySQL Server', feedback: 'Isso: a ferramenta visual se conecta ao servidor, que executa os comandos.', hint: 'Uma peça é a interface; a outra é o serviço que responde.' },
  },
  {
    id: 'conectar-servidor', level: 2, title: 'Fazer a primeira conexão', summary: 'Crie uma conexão local e entenda os campos de endereço e porta.', minutes: 7, image: 'connection',
    steps: [
      { title: 'Crie uma conexão salva', body: 'Na tela inicial do Workbench, use o botão “+” ao lado de MySQL Connections. Dê um nome fácil de reconhecer, como “Meu computador”.' },
      { title: 'Informe para onde ligar', body: 'Em uma instalação local comum, o host é 127.0.0.1 e a porta padrão do MySQL é 3306. O usuário e a senha dependem do que foi configurado no seu servidor.' },
      { title: 'Teste antes de salvar', body: 'Use “Test Connection”. Se não funcionar, confira se o serviço está iniciado, se a porta está correta e se a senha foi digitada sem espaços extras.', note: 'Não compartilhe senhas administrativas. Os valores mostrados aqui são exemplos, não credenciais universais.' },
    ],
    exercise: { kind: 'spot', prompt: 'A conexão local falhou. Qual verificação faz mais sentido primeiro?', choices: ['Ver se o serviço MySQL está iniciado', 'Alterar qualquer senha até funcionar', 'Apagar todas as tabelas'], answer: 'Ver se o serviço MySQL está iniciado', feedback: 'Correto. Se o serviço estiver parado, a bancada não terá quem responda.', hint: 'A conexão precisa encontrar um servidor ativo.' },
  },
  {
    id: 'criar-schema', level: 3, title: 'Criar seu primeiro banco', summary: 'Dê nome a um schema e confirme que ele aparece no servidor.', minutes: 6, image: 'sql',
    steps: [
      { title: 'Abra uma aba de consulta', body: 'Ao abrir uma conexão, o Workbench mostra o editor SQL. É nessa área que você digita comandos para o servidor.' },
      { title: 'Crie o banco com uma frase', body: 'CREATE DATABASE cria um novo banco. Use nomes claros, sem espaços, e termine cada comando com ponto e vírgula.', code: 'CREATE DATABASE escola_viva;' },
      { title: 'Selecione o banco de trabalho', body: 'USE indica qual banco receberá os próximos comandos. Depois, atualize a lista “Schemas” no navegador lateral do Workbench para conferir o novo banco.', code: 'USE escola_viva;' },
    ],
    exercise: { kind: 'fill', prompt: 'Complete o nome do banco no comando:', code: 'CREATE DATABASE _______;', placeholder: 'Digite escola_viva', answer: 'escola_viva', feedback: 'Muito bem. O comando completo é CREATE DATABASE escola_viva;.', hint: 'O nome é escola_viva. Não precisa repetir o comando inteiro.' },
  },
  {
    id: 'criar-tabelas', level: 3, title: 'Criar tabelas com propósito', summary: 'Escolha tipos de dados e regras para uma tabela de alunos.', minutes: 8,
    steps: [
      { title: 'Cada coluna tem um tipo', body: 'INT serve para números inteiros; VARCHAR(n) para texto com limite; DATE para datas. Escolher o tipo certo ajuda a validar e organizar os dados.' },
      { title: 'Declare o que é obrigatório', body: 'NOT NULL diz que um campo não pode ficar vazio. UNIQUE impede repetições, como dois alunos com o mesmo e-mail.' },
      { title: 'Crie uma chave primária', body: 'AUTO_INCREMENT pede ao MySQL que gere o próximo número automaticamente. Junto com PRIMARY KEY, cada aluno recebe um identificador único.', code: 'CREATE TABLE alunos (\n  id_aluno INT AUTO_INCREMENT PRIMARY KEY,\n  nome VARCHAR(120) NOT NULL,\n  email VARCHAR(150) UNIQUE\n);' },
    ],
    exercise: { kind: 'choice', prompt: 'Qual tipo de dado é mais adequado para guardar uma data de matrícula?', choices: ['DATE', 'VARCHAR(5000) sempre', 'AUTO_INCREMENT'], answer: 'DATE', feedback: 'Certo. DATE representa uma data e deixa operações de calendário mais seguras.', hint: 'Escolha o tipo que representa uma data diretamente.' },
  },
  {
    id: 'relacionar-tabelas-sql', level: 3, title: 'Criar vínculos com FOREIGN KEY', summary: 'Conecte uma matrícula ao aluno sem copiar o nome.', minutes: 8,
    steps: [
      { title: 'Crie as tabelas que serão ligadas', body: 'A tabela que será referenciada precisa ter uma chave primária. Aqui, “alunos.id_aluno” identifica cada pessoa.' },
      { title: 'Adicione o campo de referência', body: 'A tabela “matriculas” guarda um id_aluno. A restrição FOREIGN KEY diz ao MySQL que esse número precisa apontar para um aluno existente.' },
      { title: 'Veja a linha no diagrama', body: 'No editor EER, a linha entre as tabelas representa esse vínculo. O diagrama ajuda a enxergar o desenho antes de executar o SQL.', code: 'FOREIGN KEY (id_aluno)\n  REFERENCES alunos(id_aluno)' },
    ],
    exercise: { kind: 'spot', prompt: 'Por que uma chave estrangeira é útil?', choices: ['Ajuda a impedir referências a registros inexistentes', 'Deixa o fundo do diagrama colorido', 'Substitui todos os nomes de tabelas'], answer: 'Ajuda a impedir referências a registros inexistentes', feedback: 'Isso. O servidor pode validar o vínculo em vez de aceitar qualquer número.', hint: 'Pense na integridade do relacionamento.' },
  },
  {
    id: 'select', level: 4, title: 'Encontrar informações com SELECT', summary: 'Leia dados e faça perguntas simples para uma tabela.', minutes: 6, image: 'results',
    steps: [
      { title: 'Escolha o que quer ver', body: 'SELECT indica as colunas que você quer consultar. O asterisco significa “todas as colunas”.' },
      { title: 'Diga de onde vêm os dados', body: 'FROM indica a tabela. A consulta abaixo pede todas as colunas de todos os alunos.', code: 'SELECT * FROM alunos;' },
      { title: 'Filtre quando a lista crescer', body: 'WHERE limita o resultado. Use aspas simples ao comparar texto e não esqueça o ponto e vírgula.', code: "SELECT nome, email\nFROM alunos\nWHERE nome = 'Ana';" },
    ],
    exercise: { kind: 'challenge', prompt: 'Escreva uma consulta que mostre todas as colunas da tabela alunos.', placeholder: 'SELECT ...', answer: 'select * from alunos', feedback: 'Consulta correta. SELECT escolhe os dados e FROM aponta a tabela.', hint: 'Comece com SELECT * FROM alunos;.' },
  },
  {
    id: 'insert', level: 4, title: 'Adicionar linhas com INSERT', summary: 'Insira registros de forma clara, dizendo coluna por coluna.', minutes: 7,
    steps: [
      { title: 'Liste as colunas de destino', body: 'INSERT INTO informa a tabela e, entre parênteses, as colunas que você quer preencher. Isso deixa o comando mais fácil de ler.' },
      { title: 'Combine valores na mesma ordem', body: 'Cada valor corresponde à coluna que aparece na mesma posição. Textos ficam entre aspas simples.', code: "INSERT INTO alunos (nome, email)\nVALUES ('Ana Lima', 'ana@exemplo.com');" },
      { title: 'Deixe o servidor gerar a chave', body: 'Como id_aluno usa AUTO_INCREMENT, não precisamos informar esse número. Depois, uma consulta SELECT pode confirmar o novo registro.' },
    ],
    exercise: { kind: 'fill', prompt: 'Qual palavra introduz a lista de valores?', code: "INSERT INTO alunos (nome) _____ ('Ana Lima');", placeholder: 'Digite VALUES', answer: 'values', feedback: 'Perfeito. VALUES apresenta os valores que serão inseridos.', hint: 'É a palavra em inglês para “valores”.' },
  },
  {
    id: 'alterar-e-remover', level: 4, title: 'Alterar ou remover com cuidado', summary: 'Use UPDATE e DELETE sem afetar linhas que não queria.', minutes: 8,
    steps: [
      { title: 'UPDATE muda dados existentes', body: 'SET informa o novo valor. WHERE escolhe qual registro será alterado.', code: "UPDATE alunos\nSET email = 'ana.novo@exemplo.com'\nWHERE id_aluno = 1;" },
      { title: 'DELETE remove linhas', body: 'DELETE FROM apaga registros da tabela. Sem WHERE, o comando pode apagar todas as linhas da tabela. Faça a consulta equivalente primeiro para conferir o alvo.', code: 'SELECT * FROM alunos WHERE id_aluno = 1;\nDELETE FROM alunos WHERE id_aluno = 1;' },
      { title: 'Crie um hábito de segurança', body: 'Antes de executar uma alteração ou exclusão, confira a condição WHERE. Em um servidor real, mantenha cópia de segurança e peça orientação se não conhecer o banco.' },
    ],
    exercise: { kind: 'spot', prompt: 'Qual é o principal risco deste comando?', code: 'DELETE FROM alunos;', choices: ['Apagar todas as linhas da tabela', 'Trocar o e-mail de apenas um aluno', 'Criar uma cópia de segurança'], answer: 'Apagar todas as linhas da tabela', feedback: 'Exato. Sem WHERE, o comando não limita quais registros serão removidos.', hint: 'Há alguma condição que escolha os alunos a remover?' },
  },
  {
    id: 'views', level: 5, title: 'Criar uma VIEW para consultar melhor', summary: 'Salve uma consulta com nome para usá-la com facilidade.', minutes: 7,
    steps: [
      { title: 'Uma consulta que você repete', body: 'Uma VIEW é uma consulta salva com um nome. Ela apresenta dados de tabelas existentes sem copiar essas linhas para outro lugar.' },
      { title: 'Escolha as colunas úteis', body: 'Abaixo criamos uma visão simples de alunos. A tabela original continua sendo a fonte dos dados.', code: 'CREATE VIEW lista_alunos AS\nSELECT id_aluno, nome\nFROM alunos;' },
      { title: 'Consulte a visão', body: 'Depois, você pode consultar a view como se fosse uma tabela. Se a pessoa certa tiver permissão, ela também poderá reaproveitar essa consulta.', code: 'SELECT * FROM lista_alunos;' },
    ],
    exercise: { kind: 'choice', prompt: 'Uma VIEW guarda uma cópia independente de todas as linhas por padrão?', choices: ['Não. Ela representa uma consulta salva', 'Sim, sempre cria um segundo servidor', 'Sim, e apaga a tabela original'], answer: 'Não. Ela representa uma consulta salva', feedback: 'Correto. Uma view comum apresenta o resultado de uma consulta às tabelas de origem.', hint: 'Pense em uma janela para enxergar dados, não em outra cópia do servidor.' },
  },
  {
    id: 'procedures', level: 5, title: 'Conhecer uma rotina armazenada', summary: 'Veja o que é uma procedure e como ler um exemplo pequeno.', minutes: 9,
    steps: [
      { title: 'Agrupe uma rotina de trabalho', body: 'Uma stored procedure é um conjunto de comandos SQL que pode ser guardado no servidor e chamado pelo nome. Use-a quando fizer sentido padronizar uma operação.' },
      { title: 'Leia cada linha antes de executar', body: 'O exemplo abaixo cria uma rotina que lista alunos. O delimitador é temporariamente alterado no cliente para que o corpo inteiro seja enviado como uma unidade.', code: 'DELIMITER //\nCREATE PROCEDURE listar_alunos()\nBEGIN\n  SELECT id_aluno, nome FROM alunos;\nEND //\nDELIMITER ;' },
      { title: 'Chame a rotina', body: 'CALL executa uma procedure. Teste primeiro em um banco de prática e revise as permissões antes de usar qualquer rotina em um servidor compartilhado.', code: 'CALL listar_alunos();', note: 'O comando DELIMITER é uma instrução do cliente Workbench, não um comando SQL que o servidor processe sozinho.' },
    ],
    exercise: { kind: 'fill', prompt: 'Complete a chamada para executar a rotina listar_alunos:', code: '_____ listar_alunos();', placeholder: 'Digite CALL', answer: 'call', feedback: 'Isso. CALL inicia a stored procedure.', hint: 'Use o verbo SQL que chama uma procedure.' },
  },
];
