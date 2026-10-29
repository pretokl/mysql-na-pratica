export type Project = {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  description: string;
  tables: { name: string; purpose: string; columns: string[] }[];
  relations: string[];
  sql: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'escola', name: 'Escola Viva', category: 'Educação', icon: '✳', color: 'mint',
    description: 'Alunos, cursos e matrículas sem repetir informações.',
    tables: [
      { name: 'alunos', purpose: 'Guarda cada estudante.', columns: ['id_aluno · PK', 'nome', 'email · único'] },
      { name: 'cursos', purpose: 'Descreve cada curso.', columns: ['id_curso · PK', 'nome', 'carga_horaria'] },
      { name: 'matriculas', purpose: 'Liga alunos a cursos.', columns: ['id_aluno · FK', 'id_curso · FK', 'data_matricula'] },
    ],
    relations: ['alunos 1 → N matriculas', 'cursos 1 → N matriculas'],
    sql: `CREATE DATABASE escola_viva;\nUSE escola_viva;\n\nCREATE TABLE alunos (\n  id_aluno INT AUTO_INCREMENT PRIMARY KEY,\n  nome VARCHAR(120) NOT NULL,\n  email VARCHAR(150) UNIQUE\n);\n\nCREATE TABLE cursos (\n  id_curso INT AUTO_INCREMENT PRIMARY KEY,\n  nome VARCHAR(120) NOT NULL,\n  carga_horaria INT NOT NULL\n);\n\nCREATE TABLE matriculas (\n  id_aluno INT NOT NULL,\n  id_curso INT NOT NULL,\n  data_matricula DATE NOT NULL,\n  PRIMARY KEY (id_aluno, id_curso),\n  FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno),\n  FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)\n);`,
  },
  {
    id: 'rh', name: 'Equipe em Dia', category: 'RH', icon: '◈', color: 'blue',
    description: 'Organize pessoas, departamentos e datas importantes.',
    tables: [
      { name: 'departamentos', purpose: 'As áreas da empresa.', columns: ['id_departamento · PK', 'nome'] },
      { name: 'funcionarios', purpose: 'Dados de trabalho da equipe.', columns: ['id_funcionario · PK', 'id_departamento · FK', 'id_cargo · FK', 'nome', 'data_admissao'] },
      { name: 'cargos', purpose: 'Funções disponíveis.', columns: ['id_cargo · PK', 'titulo', 'faixa_salarial'] },
    ],
    relations: ['departamentos 1 → N funcionarios', 'cargos 1 → N funcionarios'],
    sql: `CREATE DATABASE equipe_em_dia;\nUSE equipe_em_dia;\n\nCREATE TABLE departamentos (\n  id_departamento INT AUTO_INCREMENT PRIMARY KEY,\n  nome VARCHAR(100) NOT NULL UNIQUE\n);\n\nCREATE TABLE cargos (\n  id_cargo INT AUTO_INCREMENT PRIMARY KEY,\n  titulo VARCHAR(100) NOT NULL,\n  faixa_salarial DECIMAL(10,2)\n);\n\nCREATE TABLE funcionarios (\n  id_funcionario INT AUTO_INCREMENT PRIMARY KEY,\n  id_departamento INT NOT NULL,\n  id_cargo INT NOT NULL,\n  nome VARCHAR(120) NOT NULL,\n  data_admissao DATE NOT NULL,\n  FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento),\n  FOREIGN KEY (id_cargo) REFERENCES cargos(id_cargo)\n);`,
  },
  {
    id: 'restaurante', name: 'Mesa & Sabor', category: 'Restaurante', icon: '⌁', color: 'orange',
    description: 'Acompanhe clientes, pedidos, produtos e itens de cada pedido.',
    tables: [
      { name: 'clientes', purpose: 'Quem faz o pedido.', columns: ['id_cliente · PK', 'nome'] },
      { name: 'produtos', purpose: 'Itens do cardápio.', columns: ['id_produto · PK', 'nome', 'preco', 'disponivel'] },
      { name: 'pedidos', purpose: 'Um atendimento realizado.', columns: ['id_pedido · PK', 'id_cliente · FK', 'data_pedido'] },
      { name: 'itens_pedido', purpose: 'Quais produtos e quantidades.', columns: ['id_pedido · FK', 'id_produto · FK', 'quantidade', 'preco_unitario'] },
    ],
    relations: ['clientes 1 → N pedidos', 'pedidos 1 → N itens_pedido', 'produtos 1 → N itens_pedido'],
    sql: `CREATE DATABASE mesa_e_sabor;\nUSE mesa_e_sabor;\n\nCREATE TABLE clientes (\n  id_cliente INT AUTO_INCREMENT PRIMARY KEY,\n  nome VARCHAR(120) NOT NULL\n);\n\nCREATE TABLE produtos (\n  id_produto INT AUTO_INCREMENT PRIMARY KEY,\n  nome VARCHAR(120) NOT NULL,\n  preco DECIMAL(8,2) NOT NULL,\n  disponivel BOOLEAN NOT NULL DEFAULT TRUE\n);\n\nCREATE TABLE pedidos (\n  id_pedido INT AUTO_INCREMENT PRIMARY KEY,\n  id_cliente INT NOT NULL,\n  data_pedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)\n);\n\nCREATE TABLE itens_pedido (\n  id_pedido INT NOT NULL,\n  id_produto INT NOT NULL,\n  quantidade INT NOT NULL DEFAULT 1,\n  preco_unitario DECIMAL(8,2) NOT NULL,\n  PRIMARY KEY (id_pedido, id_produto),\n  FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),\n  FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)\n);`,
  },
  {
    id: 'biblioteca', name: 'Estante Aberta', category: 'Biblioteca', icon: '⌑', color: 'lilac',
    description: 'Leitores, livros e empréstimos em um acervo simples.',
    tables: [
      { name: 'leitores', purpose: 'Pessoas cadastradas.', columns: ['id_leitor · PK', 'nome', 'email'] },
      { name: 'livros', purpose: 'Livros do acervo.', columns: ['id_livro · PK', 'titulo', 'ano_publicacao'] },
      { name: 'emprestimos', purpose: 'Saída e devolução dos livros.', columns: ['id_emprestimo · PK', 'id_livro · FK', 'id_leitor · FK', 'data_retirada', 'data_devolucao'] },
    ],
    relations: ['leitores 1 → N emprestimos', 'livros 1 → N emprestimos'],
    sql: `CREATE DATABASE estante_aberta;\nUSE estante_aberta;\n\nCREATE TABLE leitores (\n  id_leitor INT AUTO_INCREMENT PRIMARY KEY,\n  nome VARCHAR(120) NOT NULL,\n  email VARCHAR(150) UNIQUE\n);\n\nCREATE TABLE livros (\n  id_livro INT AUTO_INCREMENT PRIMARY KEY,\n  titulo VARCHAR(180) NOT NULL,\n  ano_publicacao YEAR\n);\n\nCREATE TABLE emprestimos (\n  id_emprestimo INT AUTO_INCREMENT PRIMARY KEY,\n  id_livro INT NOT NULL,\n  id_leitor INT NOT NULL,\n  data_retirada DATE NOT NULL,\n  data_devolucao DATE,\n  FOREIGN KEY (id_livro) REFERENCES livros(id_livro),\n  FOREIGN KEY (id_leitor) REFERENCES leitores(id_leitor)\n);`,
  },
];
