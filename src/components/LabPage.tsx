import { useEffect, useState } from 'react';
import { PROJECTS, type Project } from '../data/projects';
import { Icon } from './Icons';

type LabPageProps = { projectId: string; onProjectChange: (projectId: string) => void; onGoProjects: () => void };
type LabResult = { tone: 'success' | 'warning' | 'error'; title: string; message: string; columns?: string[]; rows?: string[][]; changed?: boolean };
type SampleRow = Record<string, string | number>;
type ProjectRows = Record<string, SampleRow[]>;
type AllProjectRows = Record<string, ProjectRows>;
type SqlExecution = { result: LabResult; update?: { tableName: string; rows: SampleRow[] } };
type Equality = { column: string; value: string | number };

const DEMO_STORAGE_KEY = 'mysqlab.demo-data.v1';

function sampleRows(projectId: string, tableName: string): SampleRow[] {
  const samples: Record<string, Record<string, SampleRow[]>> = {
    escola: {
      alunos: [{ id_aluno: 1, nome: 'Ana Lima', email: 'ana@escola.exemplo' }, { id_aluno: 2, nome: 'Davi Santos', email: 'davi@escola.exemplo' }, { id_aluno: 3, nome: 'Lia Souza', email: 'lia@escola.exemplo' }],
      cursos: [{ id_curso: 1, nome: 'Ciências', carga_horaria: 40 }, { id_curso: 2, nome: 'Robótica', carga_horaria: 32 }],
      matriculas: [{ id_aluno: 1, id_curso: 1, data_matricula: '2025-02-10' }, { id_aluno: 1, id_curso: 2, data_matricula: '2025-02-11' }],
    },
    rh: {
      departamentos: [{ id_departamento: 1, nome: 'Atendimento' }, { id_departamento: 2, nome: 'Tecnologia' }],
      funcionarios: [{ id_funcionario: 1, nome: 'Ravi Costa', data_admissao: '2024-05-06', id_departamento: 2, id_cargo: 1 }, { id_funcionario: 2, nome: 'Bia Ferreira', data_admissao: '2025-01-13', id_departamento: 1, id_cargo: 2 }],
      cargos: [{ id_cargo: 1, titulo: 'Analista', faixa_salarial: 5500 }, { id_cargo: 2, titulo: 'Coordenadora', faixa_salarial: 7200 }],
    },
    restaurante: {
      clientes: [{ id_cliente: 1, nome: 'Noah Mendes' }, { id_cliente: 2, nome: 'Eva Rocha' }],
      produtos: [{ id_produto: 1, nome: 'Suco de laranja', preco: '8,50', disponivel: 'sim' }, { id_produto: 2, nome: 'Sanduíche da casa', preco: '22,00', disponivel: 'sim' }],
      pedidos: [{ id_pedido: 21, id_cliente: 1, data_pedido: '2025-04-14 12:32' }],
      itens_pedido: [{ id_pedido: 21, id_produto: 1, quantidade: 1, preco_unitario: '8,50' }, { id_pedido: 21, id_produto: 2, quantidade: 1, preco_unitario: '22,00' }],
    },
    biblioteca: {
      leitores: [{ id_leitor: 1, nome: 'Mila Alves', email: 'mila@exemplo' }],
      livros: [{ id_livro: 1, titulo: 'O Pequeno Príncipe', ano_publicacao: 1943 }, { id_livro: 2, titulo: 'A Bolsa Amarela', ano_publicacao: 1976 }],
      emprestimos: [{ id_emprestimo: 7, id_livro: 2, id_leitor: 1, data_retirada: '2025-03-02', data_devolucao: '' }],
    },
  };
  return (samples[projectId]?.[tableName] ?? []).map((row) => ({ ...row }));
}

function createProjectRows(project: Project): ProjectRows {
  return Object.fromEntries(project.tables.map((table) => [table.name, sampleRows(project.id, table.name)]));
}

function createAllSampleRows(): AllProjectRows {
  return Object.fromEntries(PROJECTS.map((project) => [project.id, createProjectRows(project)]));
}

function loadSampleRows(): AllProjectRows {
  if (typeof window === 'undefined') return createAllSampleRows();
  try {
    const saved = window.sessionStorage.getItem(DEMO_STORAGE_KEY);
    if (!saved) return createAllSampleRows();
    const parsed: unknown = JSON.parse(saved);
    if (parsed && typeof parsed === 'object') return parsed as AllProjectRows;
  } catch {
    // Se os dados locais estiverem ilegíveis, começa uma amostra limpa.
  }
  return createAllSampleRows();
}

function columnsFor(project: Project, tableName: string): string[] {
  return project.tables.find((table) => table.name === tableName)?.columns.map((column) => column.split(' · ')[0]) ?? [];
}

function splitSqlList(value: string): string[] {
  const parts: string[] = [];
  let current = '';
  let quote: "'" | '"' | null = null;
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (quote) {
      current += character;
      if (character === quote) {
        if (value[index + 1] === quote) {
          current += value[index + 1];
          index += 1;
        } else {
          quote = null;
        }
      }
    } else if (character === "'" || character === '"') {
      quote = character;
      current += character;
    } else if (character === ',') {
      parts.push(current.trim());
      current = '';
    } else {
      current += character;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function parseSqlValue(rawValue: string): string | number {
  const value = rawValue.trim();
  if (/^'(?:''|[^'])*'$/.test(value)) return value.slice(1, -1).replace(/''/g, "'");
  if (/^"(?:""|[^"])*"$/.test(value)) return value.slice(1, -1).replace(/""/g, '"');
  if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);
  return value;
}

function parseEquality(rawCondition: string): Equality | null {
  const match = rawCondition.trim().match(/^`?([\w]+)`?\s*=\s*('(?:''|[^'])*'|"(?:""|[^"])*"|[^\s;]+)$/i);
  if (!match) return null;
  return { column: match[1].replace(/`/g, ''), value: parseSqlValue(match[2]) };
}

function matchesEquality(row: SampleRow, condition: Equality): boolean {
  return String(row[condition.column] ?? '').toLocaleLowerCase('pt-BR') === String(condition.value).toLocaleLowerCase('pt-BR');
}

function tableResult(project: Project, tableName: string, rows: SampleRow[], title: string, message: string, tone: LabResult['tone'] = 'success', changed = false): LabResult {
  const columns = rows[0] ? Object.keys(rows[0]) : columnsFor(project, tableName);
  return {
    tone,
    title,
    message,
    changed,
    columns,
    rows: rows.map((row) => columns.map((column) => String(row[column] ?? ''))),
  };
}

function invalidTable(project: Project, tableName: string): SqlExecution {
  return {
    result: { tone: 'error', title: `A tabela “${tableName}” não existe neste exemplo`, message: `Experimente uma destas tabelas: ${project.tables.map((table) => table.name).join(', ')}.` },
  };
}

function runDemoSQL(sql: string, project: Project, currentTables: ProjectRows): SqlExecution {
  const query = sql.trim().replace(/;\s*$/, '');
  if (!query) return { result: { tone: 'error', title: 'Escreva um comando primeiro', message: 'Escolha um exemplo acima ou digite um comando SQL simples para começar.' } };

  if (/^SHOW\s+DATABASES$/i.test(query)) {
    return { result: { tone: 'success', title: 'Consulta simulada concluída', message: 'A lista contém bancos de demonstração, não bancos reais do seu computador.', columns: ['Database'], rows: [['escola_viva'], ['equipe_em_dia'], ['mesa_e_sabor'], ['estante_aberta']] } };
  }
  const createDb = query.match(/^CREATE\s+DATABASE\s+([\w`]+)/i);
  if (createDb) return { result: { tone: 'success', title: `Banco “${createDb[1].replace(/`/g, '')}” preparado`, message: 'Comando reconhecido. Em um MySQL Server real, ele criaria o banco. Aqui, a resposta é apenas uma demonstração didática.' } };
  const createTable = query.match(/^CREATE\s+TABLE\s+([\w`]+)/i);
  if (createTable) return { result: { tone: 'success', title: `Tabela “${createTable[1].replace(/`/g, '')}” preparada`, message: 'A estrutura do comando foi reconhecida. A tabela não foi enviada a um servidor real.' } };
  const useDb = query.match(/^USE\s+([\w`]+)/i);
  if (useDb) return { result: { tone: 'success', title: `Banco “${useDb[1].replace(/`/g, '')}” selecionado`, message: 'Neste exercício, o banco foi selecionado só para a demonstração.' } };

  if (/^SELECT\b/i.test(query)) {
    const from = query.match(/\bFROM\s+`?([\w]+)`?/i);
    const tableName = from?.[1];
    if (!tableName) return { result: { tone: 'error', title: 'Não encontrei FROM', message: 'Uma consulta simples precisa dizer de qual tabela os dados vêm, por exemplo: SELECT * FROM alunos;' } };
    const definition = project.tables.find((table) => table.name.toLocaleLowerCase() === tableName.toLocaleLowerCase());
    if (!definition) return invalidTable(project, tableName);
    const name = definition.name;
    const allRows = (currentTables[name] ?? sampleRows(project.id, name)).map((row) => ({ ...row }));
    const whereIndex = query.search(/\bWHERE\b/i);
    let rows = allRows;
    if (whereIndex >= 0) {
      const whereText = query.slice(whereIndex + query.match(/\bWHERE\b/i)![0].length).trim();
      const equality = parseEquality(whereText);
      if (!equality) return { result: { tone: 'error', title: 'Confira a condição WHERE', message: 'Esta bancada prática aceita uma comparação simples, como WHERE id_aluno = 1 ou WHERE nome = \'Ana Lima\'.' } };
      if (!columnsFor(project, name).some((column) => column.toLocaleLowerCase() === equality.column.toLocaleLowerCase())) {
        return { result: { tone: 'error', title: `A coluna “${equality.column}” não existe nesta tabela`, message: `Tente uma destas: ${columnsFor(project, name).join(', ')}.` } };
      }
      rows = allRows.filter((row) => matchesEquality(row, equality));
    }
    if (/COUNT\s*\(/i.test(query)) return { result: { tone: 'success', title: 'Consulta simulada concluída', message: 'A contagem usa somente as linhas fictícias deste exemplo.', columns: ['total'], rows: [[String(rows.length)]] } };

    const selectPart = query.match(/^SELECT\s+([\s\S]+?)\s+FROM\b/i)?.[1]?.trim() ?? '*';
    const available = rows[0] ? Object.keys(rows[0]) : columnsFor(project, name);
    const requested = selectPart === '*' ? available : splitSqlList(selectPart).map((column) => column.replace(/`/g, '').trim());
    const chosen = requested.map((column) => available.find((known) => known.toLocaleLowerCase() === column.toLocaleLowerCase()));
    if (chosen.some((column) => !column)) return { result: { tone: 'error', title: 'Não encontrei essa coluna', message: `Tente usar: ${available.join(', ')}.` } };
    const columns = chosen as string[];
    return { result: { tone: 'success', title: 'Consulta simulada concluída', message: `${rows.length} linha(s) de exemplo. INSERT, UPDATE e DELETE refletem apenas na amostra fictícia deste navegador.`, columns, rows: rows.map((row) => columns.map((column) => String(row[column] ?? ''))) } };
  }

  const insert = query.match(/^INSERT\s+INTO\s+`?([\w]+)`?\s*\(([\s\S]*?)\)\s*VALUES\s*\(([\s\S]*)\)$/i);
  if (/^INSERT\b/i.test(query)) {
    if (!insert) return { result: { tone: 'error', title: 'Confira o formato do INSERT', message: 'Este exercício aceita uma linha por vez, no formato INSERT INTO tabela (coluna) VALUES (valor). Use aspas simples em textos.' } };
    const definition = project.tables.find((table) => table.name.toLocaleLowerCase() === insert[1].toLocaleLowerCase());
    if (!definition) return invalidTable(project, insert[1]);
    const tableName = definition.name;
    const columns = splitSqlList(insert[2]).map((column) => column.replace(/`/g, '').trim());
    const values = splitSqlList(insert[3]).map(parseSqlValue);
    const knownColumns = columnsFor(project, tableName);
    if (columns.length !== values.length || !columns.length) return { result: { tone: 'error', title: 'As colunas e os valores não combinam', message: 'Inclua um valor para cada coluna, na mesma ordem, dentro dos parênteses.' } };
    const unknown = columns.find((column) => !knownColumns.some((known) => known.toLocaleLowerCase() === column.toLocaleLowerCase()));
    if (unknown) return { result: { tone: 'error', title: `A coluna “${unknown}” não existe nesta tabela`, message: `Tente uma destas: ${knownColumns.join(', ')}.` } };
    const row: SampleRow = {};
    columns.forEach((column, index) => { row[knownColumns.find((known) => known.toLocaleLowerCase() === column.toLocaleLowerCase())!] = values[index]; });
    const existing = currentTables[tableName] ?? sampleRows(project.id, tableName);
    const primaryKey = definition.columns.find((column) => column.includes('PK'))?.split(' · ')[0];
    if (primaryKey && row[primaryKey] === undefined) {
      row[primaryKey] = Math.max(0, ...existing.map((item) => Number(item[primaryKey]) || 0)) + 1;
    }
    const nextRows = [...existing, row];
    return {
      result: tableResult(project, tableName, nextRows, 'Nova linha adicionada à amostra', 'O INSERT acrescentou uma linha fictícia. Consulte a tabela com SELECT; nada foi enviado ao MySQL Server.', 'success', true),
      update: { tableName, rows: nextRows },
    };
  }

  const update = query.match(/^UPDATE\s+`?([\w]+)`?\s+SET\s+([\s\S]+)$/i);
  if (update) {
    const definition = project.tables.find((table) => table.name.toLocaleLowerCase() === update[1].toLocaleLowerCase());
    if (!definition) return invalidTable(project, update[1]);
    const tableName = definition.name;
    const clauses = update[2].match(/^([\s\S]+?)\s+WHERE\s+([\s\S]+)$/i);
    if (!clauses) return { result: { tone: 'warning', title: 'Pausa de segurança', message: 'Este exemplo exige uma condição WHERE para evitar alterar todas as linhas. Nenhum dado foi modificado.' } };
    const assignment = clauses[1].match(/^`?([\w]+)`?\s*=\s*([\s\S]+)$/i);
    const condition = parseEquality(clauses[2]);
    if (!assignment || !condition) return { result: { tone: 'error', title: 'Confira SET e WHERE', message: 'A bancada aceita uma atribuição e uma condição simples de igualdade, como SET nome = \'Lia\' WHERE id_aluno = 1.' } };
    const setColumn = columnsFor(project, tableName).find((column) => column.toLocaleLowerCase() === assignment[1].toLocaleLowerCase());
    if (!setColumn || !columnsFor(project, tableName).some((column) => column.toLocaleLowerCase() === condition.column.toLocaleLowerCase())) return { result: { tone: 'error', title: 'Confira os nomes das colunas', message: `Use: ${columnsFor(project, tableName).join(', ')}.` } };
    const value = parseSqlValue(assignment[2]);
    const existing = currentTables[tableName] ?? sampleRows(project.id, tableName);
    const changedRows = existing.map((row) => matchesEquality(row, condition) ? { ...row, [setColumn]: value } : { ...row });
    const count = existing.filter((row) => matchesEquality(row, condition)).length;
    const result = tableResult(project, tableName, changedRows, `${count} linha(s) alterada(s) na simulação`, count ? 'O UPDATE mudou somente as linhas fictícias que correspondem à condição WHERE.' : 'Nenhuma linha correspondeu à condição. Confira o valor do WHERE e tente de novo.', count ? 'success' : 'warning', count > 0);
    return { result, update: count ? { tableName, rows: changedRows } : undefined };
  }

  const deletion = query.match(/^DELETE\s+FROM\s+`?([\w]+)`?(?:\s+WHERE\s+([\s\S]+))?$/i);
  if (deletion) {
    const definition = project.tables.find((table) => table.name.toLocaleLowerCase() === deletion[1].toLocaleLowerCase());
    if (!definition) return invalidTable(project, deletion[1]);
    const tableName = definition.name;
    if (!deletion[2]) return { result: { tone: 'warning', title: 'Pausa de segurança', message: `Este DELETE atingiria todas as linhas de “${tableName}”. Experimente adicionar WHERE, por exemplo: WHERE ${columnsFor(project, tableName).find((column) => column.includes('id')) ?? 'id'} = 1. Nenhum dado foi removido.` } };
    const condition = parseEquality(deletion[2]);
    if (!condition || !columnsFor(project, tableName).some((column) => column.toLocaleLowerCase() === condition.column.toLocaleLowerCase())) return { result: { tone: 'error', title: 'Confira a condição WHERE', message: `Use uma coluna existente: ${columnsFor(project, tableName).join(', ')}.` } };
    const existing = currentTables[tableName] ?? sampleRows(project.id, tableName);
    const nextRows = existing.filter((row) => !matchesEquality(row, condition));
    const count = existing.length - nextRows.length;
    const result = tableResult(project, tableName, nextRows, `${count} linha(s) removida(s) na simulação`, count ? 'A linha foi removida apenas da amostra fictícia deste navegador. Use restaurar para voltar ao início.' : 'Nenhuma linha correspondeu à condição. Nenhum dado foi removido.', count ? 'success' : 'warning', count > 0);
    return { result, update: count ? { tableName, rows: nextRows } : undefined };
  }

  if (/^CREATE\s+VIEW\b/i.test(query)) return { result: { tone: 'success', title: 'VIEW reconhecida', message: 'Uma VIEW apresenta uma consulta salva. Este exemplo identifica o comando, mas não cria objetos no servidor.' } };
  return { result: { tone: 'error', title: 'Este exemplo ainda não reconhece esse comando', message: 'A bancada ensina uma seleção limitada: tente SELECT, INSERT, UPDATE, DELETE, SHOW DATABASES, CREATE DATABASE ou CREATE TABLE. Ela não executa SQL arbitrário.' } };
}

export function LabPage({ projectId, onProjectChange, onGoProjects }: LabPageProps) {
  const [mode, setMode] = useState<'query' | 'builder'>('query');
  const selected = PROJECTS.find((project) => project.id === projectId) ?? PROJECTS[0];
  const [query, setQuery] = useState(`SELECT * FROM ${selected.tables[0].name};`);
  const [result, setResult] = useState<LabResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [exampleRows, setExampleRows] = useState<AllProjectRows>(loadSampleRows);

  useEffect(() => { window.sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(exampleRows)); }, [exampleRows]);

  const firstTable = selected.tables[0];
  const primaryKey = firstTable.columns.find((column) => column.includes('PK'))?.split(' · ')[0] ?? 'id';
  const examples = [
    `SELECT * FROM ${firstTable.name};`,
    `INSERT INTO ${firstTable.name} (nome) VALUES ('Novo registro');`,
    `UPDATE ${firstTable.name} SET nome = 'Nome revisado' WHERE ${primaryKey} = 1;`,
    `DELETE FROM ${firstTable.name} WHERE ${primaryKey} = 1;`,
    'SHOW DATABASES;',
    `CREATE DATABASE ${selected.id === 'escola' ? 'escola_viva' : selected.id === 'rh' ? 'equipe_em_dia' : selected.id === 'restaurante' ? 'mesa_e_sabor' : 'estante_aberta'};`,
  ];

  const chooseProject = (id: string) => {
    onProjectChange(id);
    const next = PROJECTS.find((project) => project.id === id) ?? PROJECTS[0];
    setQuery(`SELECT * FROM ${next.tables[0].name};`);
    setResult(null);
  };
  const copy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
    catch { setCopied(false); }
  };
  const execute = () => {
    const output = runDemoSQL(query, selected, exampleRows[selected.id] ?? createProjectRows(selected));
    setResult(output.result);
    if (output.update) {
      const { tableName, rows } = output.update;
      setExampleRows((current) => ({ ...current, [selected.id]: { ...(current[selected.id] ?? {}), [tableName]: rows } }));
    }
  };
  const restore = () => {
    const cleanRows = createProjectRows(selected);
    setExampleRows((current) => ({ ...current, [selected.id]: cleanRows }));
    setResult({ tone: 'success', title: 'Amostra restaurada', message: 'Os dados fictícios voltaram ao estado inicial. Você pode praticar novamente.' });
  };

  return (
    <div className="lab-page page-enter">
      <div className="page-intro lab-intro">
        <div><span className="eyebrow"><span className="eyebrow-dot" /> BANCADA DE APRENDIZAGEM</span><h1>Laboratório <span>SQL</span></h1><p>Escreva um comando, veja uma resposta de exemplo e entenda o que ele faz.</p></div>
        <div className="lab-light"><span className="live-dot" />Modo seguro: simulação</div>
      </div>
      <div className="simulation-banner"><Icon name="shield" size={18} /><p><strong>Você está em uma bancada de demonstração.</strong> Ela não se conecta ao MySQL Server e nunca altera dados reais. INSERT, UPDATE e DELETE mudam apenas as amostras fictícias deste navegador; você pode restaurá-las.</p></div>

      <div className="lab-tabs" role="tablist" aria-label="Modos do laboratório"><button type="button" role="tab" aria-selected={mode === 'query'} className={mode === 'query' ? 'active' : ''} onClick={() => setMode('query')}><Icon name="terminal" size={17} /> Experimentar comandos</button><button type="button" role="tab" aria-selected={mode === 'builder'} className={mode === 'builder' ? 'active' : ''} onClick={() => setMode('builder')}><Icon name="layers" size={17} /> Criar uma estrutura</button></div>

      {mode === 'query' ? <div className="lab-workspace">
        <section className="editor-panel">
          <div className="editor-topbar"><span><i className="window-dot red" /><i className="window-dot yellow" /><i className="window-dot green" /></span><span className="editor-file"><Icon name="code" size={14} /> consulta.sql</span><label className="project-select"><span className="sr-only">Contexto de dados</span><select value={projectId} onChange={(event) => chooseProject(event.target.value)}>{PROJECTS.map((project) => <option value={project.id} key={project.id}>{project.name}</option>)}</select><Icon name="chevron" size={14} /></label></div>
          <div className="editor-shortcuts"><span>TENTE UM EXEMPLO</span>{examples.map((sample) => <button type="button" key={sample} onClick={() => setQuery(sample)}>{sample}</button>)}</div>
          <div className="code-editor"><div className="line-numbers" aria-hidden="true">{query.split('\n').map((_, index) => <span key={index}>{index + 1}</span>)}</div><label className="sr-only" htmlFor="sql-editor">Seu comando SQL</label><textarea id="sql-editor" spellCheck={false} value={query} onChange={(event) => setQuery(event.target.value)} aria-describedby="editor-help" /><span className="sr-only" id="editor-help">Comandos simples de demonstração. Não são enviados a um servidor.</span></div>
          <div className="editor-footer"><span><span className="editor-status-dot" /> MySQL · modo de prática</span><button type="button" className="button button-primary" onClick={execute}><Icon name="play" size={15} /> Executar exemplo</button></div>
        </section>

        <section className="results-panel" aria-live="polite">
          <div className="results-heading"><div><span className="section-index">RESPOSTA</span><h2>{result?.title ?? 'O resultado aparece aqui'}</h2></div><span className={`result-state ${result?.tone ?? 'idle'}`}>{result ? result.tone === 'success' ? 'SIMULADO' : result.tone === 'warning' ? 'ATENÇÃO' : 'DICA' : 'AGUARDANDO'}</span></div>
          {result?.message && <p className={`result-message ${result.tone}`}>{result.message}</p>}
          {result?.changed && <button type="button" className="text-link" onClick={restore}>Restaurar a amostra fictícia</button>}
          {result?.rows && <div className="result-table-wrap"><table className="result-table"><thead><tr>{result.columns?.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{result.rows.map((row, index) => <tr key={`${index}-${row.join('-')}`}>{row.map((cell, cellIndex) => <td key={`${cellIndex}-${cell}`}>{cell}</td>)}</tr>)}</tbody></table></div>}
          {!result && <div className="result-empty"><div className="result-empty-icon"><Icon name="database" size={28} /></div><p>Escolha um exemplo no editor e pressione <strong>Executar exemplo</strong>.</p><small>As mudanças ficam nesta amostra fictícia até você restaurá-la.</small></div>}
        </section>
      </div> : <div className="builder-workspace">
        <div className="builder-heading"><div><span className="section-index">ESCOLHA UM CONTEXTO</span><h2>De uma ideia a um banco.</h2><p>Veja as tabelas e as relações antes de usar o SQL.</p></div><button type="button" className="text-link" onClick={onGoProjects}>Ver detalhes dos projetos <Icon name="arrow" size={16} /></button></div>
        <div className="builder-projects">{PROJECTS.map((project) => <button type="button" key={project.id} className={`builder-project ${project.id === projectId ? 'selected' : ''}`} onClick={() => chooseProject(project.id)}><span className={`builder-project-icon badge-${project.color}`}>{project.icon}</span><span><strong>{project.name}</strong><small>{project.category}</small></span>{project.id === projectId && <Icon name="check" size={16} />}</button>)}</div>
        <div className="builder-detail"><div className="builder-schema"><div className="builder-schema-head"><span className={`project-mini-icon badge-${selected.color}`}>{selected.icon}</span><span><strong>{selected.name}</strong><small>{selected.tables.length} tabelas · {selected.relations.length} relações</small></span></div><div className="schema-canvas">{selected.tables.map((table) => <article className="schema-table" key={table.name}><header><Icon name="database" size={14} /> {table.name}</header><div className="schema-table-purpose">{table.purpose}</div><ul>{table.columns.map((column) => <li key={column}><span>{column.includes('PK') ? '◇' : column.includes('FK') ? '↳' : '·'}</span>{column}</li>)}</ul></article>)}</div><div className="schema-relations"><strong>Como as tabelas se ligam</strong>{selected.relations.map((relation) => <span key={relation}><Icon name="route" size={14} />{relation}</span>)}</div></div>
          <div className="builder-sql"><div className="builder-sql-head"><span><Icon name="code" size={15} /> EXEMPLO DE ESTRUTURA</span><button type="button" onClick={() => copy(selected.sql)}><Icon name="copy" size={14} /> {copied ? 'Copiado' : 'Copiar SQL'}</button></div><pre><code>{selected.sql}</code></pre><p><Icon name="lightbulb" size={14} /> Leia o código antes de executar em um servidor real.</p></div></div>
      </div>}
    </div>
  );
}
