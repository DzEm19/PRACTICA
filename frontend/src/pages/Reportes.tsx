import { AppLayout } from '../layouts/AppLayout';
import { reportRows } from '../services/api';

interface PageProps {
  activeView?: string;
  onSelectView?: (view: string) => void;
}

export default function ReportesPage({ activeView = 'reportes', onSelectView = () => undefined }: PageProps) {
  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar">
        <div>
          <div className="eyebrow">Executive</div>
          <h1>Reportes</h1>
        </div>
      </header>

      <div className="content-stack">
        <section className="panel">
          <div className="panel-header">
            <h3>RESUMEN EJECUTIVO</h3>
          </div>

          <div className="report-list">
            {reportRows.map((row) => (
              <div key={row.name} className="report-row">
                <span>{row.name}</span>
                <strong>{row.value}</strong>
                <em>{row.change}</em>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
