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
  { id: 'course', title: 'Trilha', caption: 'Aulas guiadas', icon: 'book' },
  { id: 'projects', title: 'Modelos', caption: 'Projetos prontos', icon: 'layers' },
  { id: 'lab', title: 'Bancada SQL', caption: 'Prática segura', icon: 'flask' },
  { id: 'home', title: 'Visão geral', caption: 'Seu progresso', icon: 'home' },
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

        <div className="sidebar-section-label">ÍNDICE / APRENDER</div>
        <nav className="primary-nav" aria-label="Seções do curso">
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
