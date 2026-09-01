import type { ReactNode } from 'react';
import { menuItems } from '../services/api';

interface AppLayoutProps {
  activeView: string;
  onSelectView: (view: string) => void;
  children: ReactNode;
}

export function AppLayout({ activeView, onSelectView, children }: AppLayoutProps) {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-badge">C</div>
          <div>
            <div className="brand-title">CENTRO</div>
            <div className="brand-subtitle">INTELIGENTE</div>
          </div>
        </div>

        <nav className="menu" aria-label="Menú principal">
          {menuItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`menu-item ${activeView === item.key ? 'active' : ''}`}
              onClick={() => onSelectView(item.key)}
            >
              <span className="menu-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-panel">{children}</main>
    </div>
  );
}
