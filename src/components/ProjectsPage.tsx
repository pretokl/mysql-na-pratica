import { useState } from 'react';
import { PROJECTS } from '../data/projects';
import { Icon } from './Icons';

type ProjectsPageProps = { onOpenBuilder: (projectId: string) => void };

export function ProjectsPage({ onOpenBuilder }: ProjectsPageProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const selected = PROJECTS.find((project) => project.id === expanded);
  const copy = async (sql: string) => { try { await navigator.clipboard.writeText(sql); } catch { /* Copiar requer permissão do navegador. */ } };

  return (
    <div className="projects-page page-enter">
      <div className="page-intro"><div><span className="eyebrow"><span className="eyebrow-dot" /> BIBLIOTECA DE IDEIAS</span><h1>Comece por algo <span>familiar.</span></h1><p>Escolha um exemplo, conheça suas tabelas e veja como a estrutura vira SQL.</p></div><span className="project-index-stamp"><Icon name="layers" size={28} /><span>4<br />IDEIAS</span></span></div>

      <div className="project-grid">{PROJECTS.map((project, index) => <article className={`project-card ${expanded === project.id ? 'is-expanded' : ''}`} key={project.id}>
        <div className={`project-card-mark badge-${project.color}`}><span>{project.icon}</span><small>EXEMPLO 0{index + 1}</small></div>
        <div className="project-card-body"><span className="project-category">{project.category}</span><h2>{project.name}</h2><p>{project.description}</p><div className="project-card-meta"><span><Icon name="database" size={14} /> {project.tables.length} tabelas</span><span><Icon name="route" size={14} /> {project.relations.length} relações</span></div><button type="button" className="project-open-link" onClick={() => setExpanded(expanded === project.id ? null : project.id)}>{expanded === project.id ? 'Fechar detalhes' : 'Ver estrutura'}<Icon name={expanded === project.id ? 'chevron' : 'arrow'} size={16} /></button></div>
      </article>)}</div>

      {selected && <section className="project-detail-panel page-enter"><div className="project-detail-heading"><span className={`project-mini-icon badge-${selected.color}`}>{selected.icon}</span><div><span className="section-index">MAPA DO PROJETO</span><h2>{selected.name}</h2><p>{selected.description}</p></div><button type="button" className="icon-button" aria-label="Fechar detalhes" onClick={() => setExpanded(null)}><Icon name="close" size={18} /></button></div>
        <div className="project-detail-tables">{selected.tables.map((table) => <article className="project-table-card" key={table.name}><div className="project-table-title"><Icon name="database" size={16} /><strong>{table.name}</strong></div><p>{table.purpose}</p><div className="column-tags">{table.columns.map((column) => <span key={column} className={column.includes('PK') ? 'key-primary' : column.includes('FK') ? 'key-foreign' : ''}>{column}</span>)}</div></article>)}</div>
        <div className="project-relations-row"><strong>Relações</strong>{selected.relations.map((relation) => <span key={relation}><Icon name="route" size={15} />{relation}</span>)}</div>
        <div className="project-sql-preview"><div className="project-sql-header"><span><Icon name="code" size={15} /> SQL PARA ESTUDAR</span><button type="button" onClick={() => copy(selected.sql)}><Icon name="copy" size={14} /> Copiar SQL</button></div><pre><code>{selected.sql}</code></pre></div>
        <div className="project-detail-actions"><span>Este é um exemplo para aprender. Leia e adapte antes de usar em um servidor real.</span><button type="button" className="button button-primary" onClick={() => onOpenBuilder(selected.id)}>Abrir no laboratório <Icon name="arrow" size={17} /></button></div>
      </section>}
      {!selected && <div className="project-help-row"><span className="help-bulb"><Icon name="lightbulb" size={18} /></span><p><strong>Não precisa escolher para sempre.</strong> Use os exemplos para observar como cada contexto se transforma em tabelas.</p></div>}
    </div>
  );
}
