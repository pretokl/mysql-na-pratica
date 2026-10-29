import type { ReactNode } from 'react';

export type IconName = 'home' | 'book' | 'flask' | 'layers' | 'play' | 'arrow' | 'check' | 'spark' | 'clock' | 'database' | 'search' | 'chevron' | 'copy' | 'external' | 'lightbulb' | 'trophy' | 'menu' | 'code' | 'back' | 'download' | 'lock' | 'shield' | 'star' | 'terminal' | 'close' | 'plus' | 'target' | 'route';

type IconProps = { name: IconName; size?: number; className?: string; strokeWidth?: number };

const shapes: Record<IconName, ReactNode> = {
  home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20"/></>,
  flask: <><path d="M9 3h6M10 3v7l-5.5 8.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 10V3"/><path d="M8 16h8"/></>,
  layers: <><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
  play: <path d="m8 5 11 7-11 7z"/>,
  arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3z"/><path d="m19 14 1.2 2.3L22 17l-1.8.7L19 20l-.8-2.3L16 17l2.2-.7L19 14z"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.7 3.6 3 8 3 2 0 3.8-.3 5.2-.9M4 12v6c0 1.7 3.6 3 8 3 1.3 0 2.5-.1 3.6-.4"/><path d="M17 14v5m-2.5-2.5h5"/></>,
  search: <><circle cx="10.8" cy="10.8" r="6.6"/><path d="m16 16 4.5 4.5"/></>,
  chevron: <path d="m7 10 5 5 5-5"/>,
  copy: <><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3"/></>,
  external: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></>,
  lightbulb: <><path d="M9 18h6M10 22h4M8.5 14.5a7 7 0 1 1 7 0c-.9.7-1.5 1.4-1.5 2.5h-4c0-1.1-.6-1.8-1.5-2.5z"/></>,
  trophy: <><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 7H4v2a4 4 0 0 0 4 4M17 7h3v2a4 4 0 0 1-4 4"/></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/></>,
  back: <><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5"/><path d="M5 19v2h14v-2"/></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/></>,
  star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>,
  terminal: <><path d="m4 17 5-5-5-5M12 19h8"/></>,
  close: <><path d="m18 6-12 12M6 6l12 12"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
  route: <><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h5a3 3 0 0 0 3-3V9"/></>,
};

export function Icon({ name, size = 20, className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {shapes[name]}
    </svg>
  );
}
