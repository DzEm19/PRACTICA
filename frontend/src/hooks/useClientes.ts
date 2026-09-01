import { useMemo, useState } from 'react';
import { clientes } from '../services/api';

export function useClientes() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'Activo' | 'Pendiente' | 'Atención'>('all');

  const filteredClientes = useMemo(() => {
    const term = query.trim().toLowerCase();

    return clientes.filter((client) => {
      const matchesStatus = status === 'all' || client.status === status;
      const matchesQuery =
        term.length === 0 ||
        client.name.toLowerCase().includes(term) ||
        client.company.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term);

      return matchesStatus && matchesQuery;
    });
  }, [query, status]);

  return {
    clientes: filteredClientes,
    query,
    setQuery,
    status,
    setStatus,
  };
}
