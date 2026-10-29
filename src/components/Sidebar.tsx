import { Icon, type IconName } from './Icons';

export type PageId = 'home' | 'course' | 'lab' | 'projects';

type SidebarProps = {
  page: PageId;
  onNavigate: (page: PageId) => void;
  completed: number;
  total: number;
  open: boolean;
  onClose: () => void;
};

const navigation: { id: PageId; title: string; caption: string; icon: IconName }[] = [
  { id: 'home', title: 'Minha jornada', caption: 'Início e progresso', icon: 'home' },
  { id: 'course', title: 'Aulas passo a passo', caption: 'Trilha completa', icon: 'book' },
  { id: 'lab', title: 'Laboratório SQL', caption: 'Aprender praticando', icon: 'flask' },
  { id: 'projects', title: 'Projetos de exemplo', caption: 'Escola, RH e mais', icon: 'layers' },
];

export function Sidebar({ page, onNavigate, completed, total, open, onClose }: SidebarProps) {
  return (
    <>
      <button className={`sidebar-scrim ${open ? 'is-visible' : ''}`} aria-label="Fechar menu" onClick={onClose} tabIndex={open ? 0 : -1} />
      <aside className={`sidebar ${open ? 'is-open' : ''}`} aria-label="Navegação principal">
        <button className="brand-lockup" onClick={() => { onNavigate('home'); onClose(); }} aria-label="MySQL na Prática, início">
          <span className="brand-mark"><img src="/mysql-na-pratica-logo.svg" alt="" /></span>
          <span className="brand-copy"><strong>meu primeiro</strong><strong>MySQL</strong><small>aprenda no seu ritmo</small></span>
        </button>

        <div className="sidebar-section-label">SEU ESPAÇO</div>
        <nav className="primary-nav">
          {navigation.map((item) => (
            <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => { onNavigate(item.id); onClose(); }} aria-current={page === item.id ? 'page' : undefined}>
              <span className="nav-icon"><Icon name={item.icon} size={19} /></span>
              <span className="nav-label"><strong>{item.title}</strong><small>{item.caption}</small></span>
              {page === item.id && <span className="nav-active-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-grow" />
        <div className="sidebar-progress">
          <div className="sidebar-progress-top"><span>Seu caminho</span><span>{completed}/{total}</span></div>
          <div className="progress-track"><span style={{ width: `${total ? (completed / total) * 100 : 0}%` }} /></div>
          <p>Avanço salvo neste navegador.</p>
        </div>
        <div className="sidebar-note"><span className="sidebar-note-icon"><Icon name="lightbulb" size={17} /></span><p>Passo pequeno, aprendizado que fica.</p></div>
      </aside>
    </>
  );
}
