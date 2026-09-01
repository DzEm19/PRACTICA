import { AppLayout } from '../layouts/AppLayout';
import { clientes } from '../services/api';

interface PageProps {
  activeView?: string;
  onSelectView?: (view: string) => void;
}

export default function ClientesPage({ activeView = 'clientes', onSelectView = () => undefined }: PageProps) {
  return (
    <AppLayout activeView={activeView} onSelectView={onSelectView}>
      <header className="header-bar">
        <div>
          <div className="eyebrow">Gestión</div>
          <h1>Clientes</h1>
        </div>
      </header>

      <div className="content-stack">
        <section className="panel table-panel">
          <div className="panel-header">
            <h3>LISTA DE CLIENTES</h3>
            <button type="button" className="mini-btn">Nuevo cliente</button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Empresa</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Satisfacción</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.company}</td>
                  <td>{client.email}</td>
                  <td><span className={`status-pill ${client.status.toLowerCase().replace(/\s+/g, '-')}`}>{client.status}</span></td>
                  <td>{client.satisfaction}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </AppLayout>
  );
}
