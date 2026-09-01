const sideMenu = [
  'Dashboard',
  'Clientes',
  'Comentarios',
  'AnalisisNLP',
  'Metricas',
  'Optimizacion',
  'Reportes',
];

const cards = [
  { label: 'CLIENTES', value: '245', icon: '▣' },
  { label: 'COMENTARIOS', value: '1,248', icon: '◍' },
  { label: 'PROMEDIO', value: '16.4 min', icon: '◔' },
  { label: 'PROCESADOS', value: '94%', icon: '✓' },
];

const categoriaNLP = [
  { name: 'Soporte', value: '42%' },
  { name: 'Ventas', value: '27%' },
  { name: 'Reclamos', value: '18%' },
  { name: 'Consultas', value: '13%' },
];

const palabras = ['servicio', 'atención', 'rápido', 'producto', 'soporte', 'respuesta'];

export default function Dashboard() {
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

        <nav className="menu">
          {sideMenu.map((item, index) => (
            <button key={item} className={`menu-item ${index === 0 ? 'active' : ''}`}>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-panel">
        <header className="header-bar">
          <div>
            <div className="eyebrow">Panel principal</div>
            <h1>Dashboard</h1>
          </div>
          <div className="header-actions">
            <button className="chip">Últimos 30 días</button>
            <button className="chip highlight">Exportar</button>
          </div>
        </header>

        <section className="stats-grid">
          {cards.map((card) => (
            <div key={card.label} className="stat-card">
              <div className="card-icon">{card.icon}</div>
              <div className="card-text">
                <div className="card-label">{card.label}</div>
                <div className="card-value">{card.value}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="two-col-grid">
          <div className="panel large-panel">
            <div className="panel-header">
              <h3>TIEMPOS DE ATENCIÓN</h3>
              <button className="mini-btn">ver</button>
            </div>

            <div className="chart-box">
              <div className="grid-lines" />
              <div className="bars">
                {[30, 42, 35, 58, 52, 67, 60, 76, 64, 82].map((height, index) => (
                  <span key={index} style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          </div>

          <div className="panel small-panel">
            <div className="panel-header">
              <h3>CATEGORÍAS NLP</h3>
              <button className="mini-btn">actualizar</button>
            </div>

            <div className="category-list">
              {categoriaNLP.map((item) => (
                <div key={item.name} className="category-row">
                  <span>{item.name}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel words-panel">
            <div className="panel-header">
              <h3>PALABRAS MÁS FRECUENTES</h3>
            </div>

            <div className="word-cloud">
              {palabras.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </div>
          </div>

          <div className="panel metrics-panel">
            <div className="panel-header">
              <h3>METRICAS</h3>
            </div>

            <div className="bars-stack">
              <div className="bar-track">
                <span>Atención</span>
                <div className="track"><i style={{ width: '78%' }} /></div>
              </div>
              <div className="bar-track">
                <span>NLP</span>
                <div className="track"><i style={{ width: '86%' }} /></div>
              </div>
              <div className="bar-track">
                <span>Calidad</span>
                <div className="track"><i style={{ width: '92%' }} /></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
