import { AppLayout } from '../layouts/AppLayout';
import { optimizationScenarios } from '../services/api';

interface PageProps {
  activeView?: string;
  onSelectView?: (view: string) => void;
}

export default function OptimizacionPage({ activeView = 'optimizacion', onSelectView = () => undefined }: PageProps) {
  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar">
        <div>
          <div className="eyebrow">SciPy</div>
          <h1>Optimización</h1>
        </div>
      </header>

      <div className="content-stack">
        <section className="panel">
          <div className="panel-header">
            <h3>ESCENARIOS DE OPTIMIZACIÓN</h3>
            <button type="button" className="mini-btn">Crear escenario</button>
          </div>

          <div className="scenario-grid">
            {optimizationScenarios.map((scenario) => (
              <article key={scenario.name} className="scenario-card">
                <div className="scenario-head">
                  <strong>{scenario.name}</strong>
                  <span className={`status-pill ${scenario.status.toLowerCase().replace(/\s+/g, '-')}`}>{scenario.status}</span>
                </div>
                <p>{scenario.description}</p>
                <div className="scenario-meta">
                  <span>Impacto: {scenario.impact}</span>
                  <span>ROI: {scenario.roi}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
