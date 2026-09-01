import { AppLayout } from '../layouts/AppLayout';
import { comentarios } from '../services/api';

interface PageProps {
  activeView?: string;
  onSelectView?: (view: string) => void;
}

export default function ComentariosPage({ activeView = 'comentarios', onSelectView = () => undefined }: PageProps) {
  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar">
        <div>
          <div className="eyebrow">Atención</div>
          <h1>Comentarios</h1>
        </div>
      </header>

      <div className="content-stack">
        <section className="panel table-panel">
          <div className="panel-header">
            <h3>HISTORIAL DE COMENTARIOS</h3>
            <button type="button" className="mini-btn">Exportar</button>
          </div>

          <div className="comment-list">
            {comentarios.map((comment) => (
              <article key={comment.id} className="comment-card">
                <div className="comment-header">
                  <div>
                    <strong>{comment.client}</strong>
                    <span>{comment.category}</span>
                  </div>
                  <span className={`sentiment-pill ${comment.sentiment.toLowerCase()}`}>{comment.sentiment}</span>
                </div>
                <p>{comment.text}</p>
                <div className="comment-meta">
                  <span>Tiempo de respuesta: {comment.responseTime}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
