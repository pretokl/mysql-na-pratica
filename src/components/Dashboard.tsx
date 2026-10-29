import { LESSONS, LEVELS } from '../data/lessons';
import { PROJECTS } from '../data/projects';
import type { StudentProgress } from '../lib/progress';
import { Icon } from './Icons';
import type { PageId } from './Sidebar';

type DashboardProps = {
  progress: StudentProgress;
  onOpenLesson: (lessonId: string) => void;
  onNavigate: (page: PageId) => void;
};

export function Dashboard({ progress, onOpenLesson, onNavigate }: DashboardProps) {
  const finished = progress.completedLessons.length;
  const nextLesson = LESSONS.find((lesson) => !progress.completedLessons.includes(lesson.id)) ?? LESSONS[LESSONS.length - 1];
  const percentage = Math.round((finished / LESSONS.length) * 100);
  const scored = Object.values(progress.scores);
  const accuracy = scored.length ? Math.round((scored.reduce((sum, score) => sum + score, 0) / scored.length) * 100) : 0;

  return (
    <div className="dashboard-page page-enter">
      <div className="welcome-row"><div><span className="eyebrow"><span className="eyebrow-dot" /> SUA JORNADA COMEÇA AQUI</span><h1>Banco de dados,<br /><span>sem mistério.</span></h1><p className="welcome-copy">Aprenda uma ideia de cada vez. Veja como funciona. Pratique quando estiver pronto.</p></div><div className="hero-stamp" aria-hidden="true"><span className="stamp-ring"><Icon name="database" size={40} /></span><span className="stamp-caption">PASSO A<br />PASSO</span><i className="stamp-star">✳</i></div></div>

      <section className="continue-card" aria-label="Continuar aprendizagem">
        <div className="continue-main"><div className="continue-chip"><Icon name="play" size={14} /> {finished === 0 ? 'PRIMEIRO PASSO' : 'CONTINUE DE ONDE PAROU'}</div><h2>{nextLesson.title}</h2><p>{nextLesson.summary}</p><button type="button" className="button button-cream" onClick={() => onOpenLesson(nextLesson.id)}><span>{finished === 0 ? 'Começar primeira aula' : 'Continuar a trilha'}</span><Icon name="arrow" size={18} /></button></div>
        <div className="continue-side"><div className="progress-circle" style={{ '--progress': `${percentage * 3.6}deg` } as React.CSSProperties}><div><strong>{percentage}<small>%</small></strong><span>do caminho</span></div></div><div className="continue-side-meta"><span><strong>{finished}</strong> de {LESSONS.length} aulas</span><span><Icon name="clock" size={14} /> Ritmo tranquilo</span></div></div>
        <span className="continue-decoration decor-one" /><span className="continue-decoration decor-two" />
      </section>

      <section className="journey-stats" aria-label="Resumo da jornada">
        <div className="stat-item"><span className="stat-icon stat-icon-mint"><Icon name="book" size={18} /></span><span><strong>{finished}<small>/{LESSONS.length}</small></strong><small>aulas concluídas</small></span></div>
        <span className="stat-divider" />
        <div className="stat-item"><span className="stat-icon stat-icon-lilac"><Icon name="target" size={18} /></span><span><strong>{accuracy}<small>%</small></strong><small>nos exercícios</small></span></div>
        <span className="stat-divider" />
        <div className="stat-item"><span className="stat-icon stat-icon-orange"><Icon name="spark" size={18} /></span><span><strong>{LEVELS.length}<small> níveis</small></strong><small>no seu ritmo</small></span></div>
      </section>

      <section className="level-section">
        <div className="section-heading"><div><span className="section-index">01 / TRILHA</span><h2>Seu mapa de aprendizagem</h2><p>As aulas ficam disponíveis. Siga a ordem sugerida ou revise quando quiser.</p></div><button className="text-link" onClick={() => onNavigate('course')}>Ver todas as aulas <Icon name="arrow" size={16} /></button></div>
        <div className="level-list">
          {LEVELS.map((level) => {
            const lessons = LESSONS.filter((lesson) => lesson.level === level.id);
            const levelDone = lessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length;
            return (
              <button key={level.id} type="button" className="level-row" onClick={() => onOpenLesson(lessons[0].id)}>
                <span className={`level-number level-${level.color}`}>{String(level.id).padStart(2, '0')}</span>
                <span className="level-row-copy"><strong>{level.title}</strong><small>{level.subtitle}</small></span>
                <span className="level-row-meter"><span className="level-meter-track"><i style={{ width: `${lessons.length ? (levelDone / lessons.length) * 100 : 0}%` }} /></span><small>{levelDone}/{lessons.length} aulas</small></span>
                <span className="level-row-action">{levelDone === lessons.length && lessons.length ? <Icon name="check" size={18} /> : <Icon name="arrow" size={18} />}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="project-teaser">
        <div className="project-teaser-copy"><span className="section-index">02 / COLOCAR EM PRÁTICA</span><h2>Aprender usando exemplos do dia a dia.</h2><p>Escolha um contexto e descubra quais tabelas ajudam a contar essa história.</p><button type="button" className="button button-outline" onClick={() => onNavigate('projects')}>Explorar projetos <Icon name="arrow" size={17} /></button></div>
        <div className="teaser-badges">{PROJECTS.slice(0, 3).map((project) => <button key={project.id} type="button" className={`teaser-badge badge-${project.color}`} onClick={() => onNavigate('projects')} aria-label={`Explorar projeto ${project.name}`}>{project.name}</button>)}</div>
      </section>
    </div>
  );
}
