import { AppLayout } from '../layouts/AppLayout';
import { createComment, deleteComment, listComments, updateComment } from '../services/comentarios';
import { createAttentionTime, listAttentionTimes } from '../services/tiempos';
import type { AttentionTimeRecord, CommentRecord, ViewKey } from '../types';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

interface PageProps {
  activeView?: ViewKey;
  onSelectView?: (view: ViewKey) => void;
}

export default function ComentariosPage({ activeView = 'comentarios', onSelectView = () => undefined }: PageProps) {
  const [comments, setComments] = useState<CommentRecord[]>([]);
  const [times, setTimes] = useState<AttentionTimeRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<CommentRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ search: '', status: 'all', category: 'all' });
  const [timeForm, setTimeForm] = useState({ commentId: '', minutes: '', notes: '' });
  const [form, setForm] = useState({ content: '', clientId: '', category: '', channel: 'web', status: 'pendiente', processed: false });

  const loadComments = async () => {
    try {
      setComments(await listComments());
      setTimes(await listAttentionTimes());
    } catch {
      setError('No se pudieron cargar los comentarios desde la API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadComments(); }, []);

  const resetForm = () => {
    setForm({ content: '', clientId: '', category: '', channel: 'web', status: 'pendiente', processed: false });
    setEditing(null);
    setShowForm(false);
  };

  const editComment = (comment: CommentRecord) => {
    setEditing(comment);
    setForm({ content: comment.content, clientId: comment.clientId?.toString() ?? '', category: comment.category ?? '', channel: comment.channel, status: comment.status, processed: comment.processed });
    setShowForm(true);
  };

  const addComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.content.trim()) return;
    const input = {
      content: form.content.trim(),
      clientId: form.clientId ? Number(form.clientId) : null,
      category: form.category,
      channel: form.channel.trim() || 'web',
      status: form.status,
      processed: form.processed,
    };
    try {
      if (editing) {
        const updated = await updateComment(editing.id, input);
        setComments((current) => current.map((item) => item.id === updated.id ? updated : item));
      } else {
        const created = await createComment(input);
        setComments((current) => [created, ...current]);
      }
    } catch {
      setError('No se pudo guardar el comentario.');
    }
    resetForm();
  };

  const changeStatus = async (comment: CommentRecord, status: string) => {
    setComments((current) => current.map((item) => item.id === comment.id ? { ...item, status } : item));
    try {
      const updated = await updateComment(comment.id, { content: comment.content, clientId: comment.clientId, category: comment.category ?? '', channel: comment.channel, status, processed: comment.processed });
      setComments((current) => current.map((item) => item.id === updated.id ? updated : item));
    } catch { setError('No se pudo sincronizar el estado con la API.'); }
  };

  const removeComment = async (id: number) => {
    setComments((current) => current.filter((item) => item.id !== id));
    try { await deleteComment(id); } catch { setError('No se pudo sincronizar el borrado con la API.'); }
  };

  const filteredComments = comments.filter((comment) => {
    const term = filters.search.trim().toLowerCase();
    return (!term || `${comment.client} ${comment.content} ${comment.channel}`.toLowerCase().includes(term))
      && (filters.status === 'all' || comment.status === filters.status)
      && (filters.category === 'all' || comment.category === filters.category);
  });

  const addAttentionTime = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!timeForm.commentId || !timeForm.minutes) return;
    try {
      const created = await createAttentionTime({ commentId: Number(timeForm.commentId), minutes: Number(timeForm.minutes), notes: timeForm.notes });
      setTimes((current) => [created, ...current]);
      setTimeForm({ commentId: '', minutes: '', notes: '' });
    } catch { setError('No se pudo registrar el tiempo de atención.'); }
  };

  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar comments-header">
        <div>
          <div className="eyebrow">Atención</div>
          <h1>Comentarios</h1>
          <p className="page-intro">Gestiona conversaciones, estados y tiempos de respuesta desde un solo lugar.</p>
        </div>
        <div className="header-actions">
          <button type="button" className="chip highlight" onClick={() => { resetForm(); setShowForm(true); }}>Nuevo comentario</button>
        </div>
      </header>

      <div className="stats-grid">
        <article className="stat-card">
          <div className="card-icon positive">P</div>
          <div className="card-text">
            <div className="card-label">Total comentarios</div>
            <div className="card-value">{comments.length}</div>
            <div className="card-detail-row"><span className="card-detail">Registros activos</span></div>
          </div>
        </article>

        <article className="stat-card">
          <div className="card-icon neutral">N</div>
          <div className="card-text">
            <div className="card-label">Pendientes</div>
            <div className="card-value">{comments.filter((comment) => comment.status === 'pendiente').length}</div>
            <div className="card-detail-row"><span className="card-detail">Requieren atención</span></div>
          </div>
        </article>

        <article className="stat-card">
          <div className="card-icon warning">R</div>
          <div className="card-text">
            <div className="card-label">Procesados</div>
            <div className="card-value">{comments.filter((comment) => comment.processed).length}</div>
            <div className="card-detail-row"><span className="card-detail">Con análisis completado</span></div>
          </div>
        </article>

        <article className="stat-card">
          <div className="card-icon positive">T</div>
          <div className="card-text">
            <div className="card-label">Tiempos registrados</div>
            <div className="card-value">{times.length}</div>
            <div className="card-detail-row"><span className="card-detail">Seguimientos de atención</span></div>
          </div>
        </article>
      </div>

      <div className="content-stack">
        {error && <div className="form-notice">{error}<button type="button" onClick={() => setError('')}>Cerrar</button></div>}
        {showForm && <form className="panel comment-form" onSubmit={addComment}>
          <div className="panel-header"><h3>{editing ? 'EDITAR COMENTARIO' : 'NUEVO COMENTARIO'}</h3><button type="button" className="mini-btn" onClick={resetForm}>Cerrar</button></div>
          <input type="number" min="1" value={form.clientId} placeholder="ID del cliente (opcional)" onChange={(event) => setForm({ ...form, clientId: event.target.value })} />
          <textarea required value={form.content} placeholder="Escribe el comentario" onChange={(event) => setForm({ ...form, content: event.target.value })} />
          <div className="form-row"><input value={form.category} placeholder="Categoría" onChange={(event) => setForm({ ...form, category: event.target.value })} /><input value={form.channel} placeholder="Canal" onChange={(event) => setForm({ ...form, channel: event.target.value })} /><select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option value="pendiente">Pendiente</option><option value="en_revision">En revisión</option><option value="resuelto">Resuelto</option></select><label><input type="checkbox" checked={form.processed} onChange={(event) => setForm({ ...form, processed: event.target.checked })} /> Procesado</label><button className="chip highlight" type="submit">Guardar</button></div>
        </form>}
        <section className="panel table-panel comments-panel">
          <div className="panel-header">
            <h3>HISTORIAL DE COMENTARIOS</h3>
          </div>

          <div className="filter-row comment-filters">
            <input value={filters.search} placeholder="Buscar comentario, cliente o canal" onChange={(event) => setFilters({ ...filters, search: event.target.value })} />
            <select value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}><option value="all">Todos los estados</option><option value="pendiente">Pendiente</option><option value="en_revision">En revisión</option><option value="resuelto">Resuelto</option></select>
            <select value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}><option value="all">Todas las categorías</option>{['Soporte', 'Ventas', 'Reclamo', 'Consulta', 'Felicitación'].map((category) => <option key={category}>{category}</option>)}</select>
          </div>

          {loading ? <p>Cargando comentarios...</p> : filteredComments.length === 0 ? <p>No hay comentarios que coincidan con los filtros.</p> : <div className="comment-table-wrap"><table className="comment-table"><thead><tr><th>ID</th><th>Cliente</th><th>Contenido</th><th>Canal</th><th>Estado</th><th>Categoría</th><th>Fecha</th><th>Procesado</th><th>Acciones</th></tr></thead><tbody>{filteredComments.map((comment) => <tr key={comment.id}><td>{comment.id}</td><td>{comment.client}</td><td className="comment-content-cell">{comment.content}</td><td>{comment.channel}</td><td><select aria-label={`Estado del comentario ${comment.id}`} value={comment.status} onChange={(event) => changeStatus(comment, event.target.value)}><option value="pendiente">Pendiente</option><option value="en_revision">En revisión</option><option value="resuelto">Resuelto</option></select></td><td>{comment.category || 'Sin categoría'}</td><td>{comment.date ? new Date(comment.date).toLocaleString('es-ES') : '-'}</td><td>{comment.processed ? 'Sí' : 'No'}</td><td><button type="button" className="mini-btn" onClick={() => editComment(comment)}>Editar</button><button type="button" className="mini-btn danger" onClick={() => removeComment(comment.id)}>Eliminar</button></td></tr>)}</tbody></table></div>}
        </section>

        <section className="panel table-panel attention-panel">
          <div className="panel-header"><h3>TIEMPOS DE ATENCIÓN</h3></div>
          <form className="form-row time-form" onSubmit={addAttentionTime}><select required value={timeForm.commentId} onChange={(event) => setTimeForm({ ...timeForm, commentId: event.target.value })}><option value="">Comentario</option>{comments.map((comment) => <option key={comment.id} value={comment.id}>#{comment.id} - {comment.content.slice(0, 45)}</option>)}</select><input required type="number" min="0" value={timeForm.minutes} placeholder="Minutos" onChange={(event) => setTimeForm({ ...timeForm, minutes: event.target.value })} /><input value={timeForm.notes} placeholder="Observaciones (opcional)" onChange={(event) => setTimeForm({ ...timeForm, notes: event.target.value })} /><button className="chip highlight" type="submit">Registrar tiempo</button></form>
          {times.length === 0 ? <p>No hay tiempos registrados.</p> : <div className="comment-table-wrap"><table className="comment-table"><thead><tr><th>ID</th><th>Comentario</th><th>Minutos</th><th>Fecha</th><th>Observaciones</th></tr></thead><tbody>{times.map((time) => <tr key={time.id}><td>{time.id}</td><td>#{time.commentId} - {time.content}</td><td>{time.minutes}</td><td>{time.date ? new Date(time.date).toLocaleString('es-ES') : '-'}</td><td>{time.notes || '-'}</td></tr>)}</tbody></table></div>}
        </section>
      </div>
    </AppLayout>
  );
}
