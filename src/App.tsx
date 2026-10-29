import { useEffect, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { CoursePage } from './components/CoursePage';
import { Icon } from './components/Icons';
import { LabPage } from './components/LabPage';
import { ProjectsPage } from './components/ProjectsPage';
import { Sidebar, type PageId } from './components/Sidebar';
import { LESSONS } from './data/lessons';
import { loadProgress, saveProgress, type StudentProgress } from './lib/progress';

const pageTitles: Record<PageId, string> = {
  home: 'Minha jornada',
  course: 'Aulas passo a passo',
  lab: 'Laboratório SQL',
  projects: 'Projetos de exemplo',
};

export default function App() {
  const [page, setPage] = useState<PageId>('home');
  const [currentLessonId, setCurrentLessonId] = useState(LESSONS[0].id);
  const [selectedProjectId, setSelectedProjectId] = useState('escola');
  const [progress, setProgress] = useState<StudentProgress>(loadProgress);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentLesson = LESSONS.find((lesson) => lesson.id === currentLessonId) ?? LESSONS[0];

  useEffect(() => { saveProgress(progress); }, [progress]);
  useEffect(() => { document.title = `${pageTitles[page]} — MySQL na Prática`; }, [page]);

  const setScore = (lessonId: string, score: number) => {
    setProgress((current) => ({ ...current, scores: { ...current.scores, [lessonId]: Math.max(current.scores[lessonId] ?? 0, score) } }));
  };
  const completeLesson = (lessonId: string) => {
    setProgress((current) => current.completedLessons.includes(lessonId) ? current : { ...current, completedLessons: [...current.completedLessons, lessonId] });
  };
  const openLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    setPage('course');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      <Sidebar page={page} onNavigate={setPage} completed={progress.completedLessons.length} total={LESSONS.length} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-shell">
        <header className="topbar">
          <div className="topbar-leading"><button className="mobile-menu-button" type="button" aria-label="Abrir menu" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(true)}><Icon name="menu" size={20} /></button><div className="topbar-crumb"><span>MEU PRIMEIRO MYSQL</span><i>/</i><strong>{pageTitles[page]}</strong></div></div>
          <div className="topbar-actions"><span className="topbar-pill"><span className="topbar-pill-dot" /> Aprendendo no seu ritmo</span><div className="profile-mark" aria-label="Seu espaço de aprendizagem">EU</div></div>
        </header>
        <main className="main-content">
          {page === 'home' && <Dashboard progress={progress} onOpenLesson={openLesson} onNavigate={setPage} />}
          {page === 'course' && <CoursePage lesson={currentLesson} progress={progress} onSelectLesson={openLesson} onComplete={completeLesson} onScore={setScore} />}
          {page === 'lab' && <LabPage projectId={selectedProjectId} onProjectChange={setSelectedProjectId} onGoProjects={() => setPage('projects')} />}
          {page === 'projects' && <ProjectsPage onOpenBuilder={(projectId) => { setSelectedProjectId(projectId); setPage('lab'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />}
          <footer className="site-footer"><span>Feito para aprender com calma.</span><span>Um passo por vez <span className="footer-star">✳</span></span></footer>
        </main>
      </div>
    </div>
  );
}
