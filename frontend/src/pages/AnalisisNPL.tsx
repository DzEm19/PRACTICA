import { AppLayout } from '../layouts/AppLayout';
import { categoryMetrics, wordCloud } from '../services/api';

interface PageProps {
  activeView?: string;
  onSelectView?: (view: string) => void;
}

export default function AnalisisNLPPage({ activeView = 'analisisNLP', onSelectView = () => undefined }: PageProps) {
  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar">
        <div>
          <div className="eyebrow">Inteligencia</div>
          <h1>Análisis NLP</h1>
        </div>
      </header>

      <div className="two-col-grid">
        <section className="panel">
          <div className="panel-header">
            <h3>PALABRAS FRECUENTES</h3>
          </div>

          <div className="word-cloud compact">
            {wordCloud.map((item) => (
              <span
                key={item.word}
                style={{ fontSize: `${Math.min(0.9 + item.size * 0.32, 1.15)}rem` }}
              >
                {item.word}
              </span>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h3>CATEGORIZACIÓN</h3>
          </div>

          <div className="category-list">
            {categoryMetrics.map((item) => (
              <div key={item.name} className="category-row">
                <div className="category-name-wrap">
                  <span className="category-dot" style={{ background: item.color }} />
                  <span>{item.name}</span>
                </div>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
