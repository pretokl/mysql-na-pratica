import { useEffect, useState } from 'react';
import { LESSONS, LEVELS, type Lesson } from '../data/lessons';
import type { StudentProgress } from '../lib/progress';
import { ExerciseCard } from './ExerciseCard';
import { Icon } from './Icons';

type CoursePageProps = {
  lesson: Lesson;
  progress: StudentProgress;
  onSelectLesson: (id: string) => void;
  onComplete: (id: string) => void;
  onScore: (id: string, score: number) => void;
};

const ASSET_BASE = import.meta.env.BASE_URL;

const LESSON_IMAGES = {
  eer: { src: `${ASSET_BASE}images/workbench-eer-diagram.png`, alt: 'Tela do MySQL Workbench com o editor visual de modelos e diagrama de tabelas', href: 'https://dev.mysql.com/doc/workbench/en/wb-getting-started-tutorial-creating-a-model.html', label: 'Editor de modelos EER do Workbench', source: 'Manual do MySQL Workbench', caption: 'Captura oficial do editor de modelos. A aparência pode mudar entre versões.' },
  sql: { src: `${ASSET_BASE}images/workbench-sql-editor.png`, alt: 'Editor SQL do MySQL Workbench com a barra de ferramentas e a área de consulta', href: 'https://dev.mysql.com/doc/workbench/en/wb-sql-editor-query-panel.html', label: 'Editor de consultas SQL do Workbench', source: 'Manual do MySQL Workbench', caption: 'Captura oficial do editor SQL. A aparência pode mudar entre versões.' },
  install: { src: `${ASSET_BASE}images/mysql-installer-products-windows.png`, alt: 'Tela de seleção de produtos do MySQL Installer para Windows', href: 'https://dev.mysql.com/doc/mysql-installer/en/mysql-installer-change-path-proc.html', label: 'Seleção de produtos do MySQL Installer', source: 'MySQL Installer para Windows', caption: 'Exemplo do instalador para Windows; as telas e os passos de macOS e Linux são diferentes.' },
  connection: { src: `${ASSET_BASE}images/workbench-connection.png`, alt: 'Janela Setup New Connection do MySQL Workbench com campos de host, porta e usuário', href: 'https://dev.mysql.com/doc/workbench/en/wb-getting-started-tutorial-create-connection.html', label: 'Configuração da conexão no Workbench', source: 'Manual do MySQL Workbench', caption: 'Tela oficial de configuração. Os valores locais podem mudar conforme a instalação.' },
  results: { src: `${ASSET_BASE}images/workbench-results-grid.png`, alt: 'MySQL Workbench mostrando uma grade de resultados de uma consulta SQL', href: 'https://dev.mysql.com/doc/workbench/en/wb-develop-sql-editor-results.html', label: 'Grade de resultados SQL do Workbench', source: 'Manual do MySQL Workbench', caption: 'Captura oficial da grade de resultados. Os dados da imagem pertencem ao exemplo do manual.' },
} as const;

export function CoursePage({ lesson, progress, onSelectLesson, onComplete, onScore }: CoursePageProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showExercise, setShowExercise] = useState(false);
  useEffect(() => { setStepIndex(0); setShowExercise(false); }, [lesson.id]);

  const lessonIndex = LESSONS.findIndex((item) => item.id === lesson.id);
  const previous = LESSONS[lessonIndex - 1];
  const next = LESSONS[lessonIndex + 1];
  const currentStep = lesson.steps[stepIndex];
  const completed = progress.completedLessons.includes(lesson.id);
  const image = lesson.image ? LESSON_IMAGES[lesson.image] : undefined;

  return (
    <div className="course-page page-enter">
      <aside className="course-rail" aria-label="Aulas da trilha">
        <div className="rail-heading"><span className="section-index">AULAS</span><strong>Seu caminho</strong></div>
        {LEVELS.map((level) => {
          const items = LESSONS.filter((item) => item.level === level.id);
          const done = items.filter((item) => progress.completedLessons.includes(item.id)).length;
          return <section className="rail-level" key={level.id}>
            <div className="rail-level-heading"><span className={`rail-level-number level-${level.color}`}>{String(level.id).padStart(2, '0')}</span><span><strong>{level.title}</strong><small>{done}/{items.length}</small></span></div>
            <div className="rail-lessons">{items.map((item) => <button type="button" key={item.id} className={`rail-lesson ${item.id === lesson.id ? 'selected' : ''}`} onClick={() => onSelectLesson(item.id)}><span className={`rail-lesson-status ${progress.completedLessons.includes(item.id) ? 'done' : ''}`}>{progress.completedLessons.includes(item.id) ? <Icon name="check" size={11} /> : ''}</span><span>{item.title}</span></button>)}</div>
          </section>;
        })}
      </aside>

      <article className="lesson-main">
        <div className="lesson-breadcrumb"><Icon name="book" size={15} /><span>Nível {lesson.level} · {LEVELS[lesson.level - 1].title}</span><span className="breadcrumb-slash">/</span><span>Aula {String(lessonIndex + 1).padStart(2, '0')}</span></div>
        <div className="lesson-title-block"><div className="lesson-title-copy"><span className="lesson-mini-label">UMA IDEIA DE CADA VEZ</span><h1>{lesson.title}</h1><p>{lesson.summary}</p></div><span className="lesson-time"><Icon name="clock" size={15} /> {lesson.minutes} min</span></div>

        <div className="lesson-progress-line"><span><strong>Passo {stepIndex + 1}</strong> de {lesson.steps.length}</span><div className="step-track">{lesson.steps.map((step, index) => <i key={step.title} className={index <= stepIndex ? 'is-active' : ''} />)}</div></div>

        <section className="step-card" aria-live="polite">
          <div className="step-card-top"><span className="step-card-number">{String(stepIndex + 1).padStart(2, '0')}</span><span className="step-card-label">VAMOS ENTENDER</span></div>
          <h2>{currentStep.title}</h2>
          <p className="step-explanation">{currentStep.body}</p>
          {currentStep.code && <div className="lesson-code"><div className="lesson-code-header"><span><i className="window-dot red" /><i className="window-dot yellow" /><i className="window-dot green" /></span><span>EXEMPLO</span><button type="button" onClick={() => navigator.clipboard?.writeText(currentStep.code ?? '')}><Icon name="copy" size={15} /> Copiar</button></div><pre><code>{currentStep.code}</code></pre></div>}
          {currentStep.note && <div className="teacher-note"><span className="teacher-note-icon"><Icon name="lightbulb" size={17} /></span><div><strong>Uma dica para lembrar</strong><p>{currentStep.note}</p></div></div>}
        </section>

        {image && <figure className="workbench-figure"><div className="figure-topline"><span className="figure-live-dot" /><span>OLHO NA TELA REAL</span><span className="figure-version">{image.source}</span></div><img src={image.src} alt={image.alt} /><figcaption><span><strong>{image.label}</strong><small>{image.caption}</small></span><a href={image.href} target="_blank" rel="noreferrer">Abrir fonte oficial <Icon name="external" size={14} /></a></figcaption></figure>}

        <div className="step-navigation"><button type="button" className="button button-quiet" onClick={() => { setStepIndex((index) => Math.max(0, index - 1)); setShowExercise(false); }} disabled={stepIndex === 0}><Icon name="back" size={17} /> Anterior</button><span className="step-nav-message">Leia com calma. Você pode voltar quando quiser.</span><button type="button" className="button button-primary" onClick={() => { if (stepIndex < lesson.steps.length - 1) setStepIndex((index) => index + 1); else setShowExercise(true); }}>{stepIndex < lesson.steps.length - 1 ? <>Próximo passo <Icon name="arrow" size={17} /></> : <>Fazer exercício <Icon name="arrow" size={17} /></>}</button></div>

        {showExercise && <div className="lesson-practice page-enter"><div className="practice-divider"><span>AGORA É COM VOCÊ</span></div><ExerciseCard lesson={lesson} onScore={onScore} /><div className="lesson-finish-row"><div className="finish-note"><span className="finish-check"><Icon name="check" size={18} /></span><span><strong>{completed ? 'Esta aula já está marcada como concluída.' : 'Terminou? Marque esta aula como concluída.'}</strong><small>Seu progresso fica salvo neste navegador.</small></span></div><button type="button" className={`button ${completed ? 'button-complete' : 'button-primary'}`} onClick={() => onComplete(lesson.id)} disabled={completed}>{completed ? <><Icon name="check" size={16} /> Concluída</> : 'Concluir aula'}</button></div>{next && <button type="button" className="next-lesson-link" onClick={() => onSelectLesson(next.id)}>Próxima aula: <strong>{next.title}</strong><Icon name="arrow" size={16} /></button>}</div>}
      </article>
    </div>
  );
}
