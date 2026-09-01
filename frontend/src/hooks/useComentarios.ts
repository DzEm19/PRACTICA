import { useMemo, useState } from 'react';
import { comentarios } from '../services/api';
import type { CommentRecord } from '../types';

export interface ComentarioFilters {
  sentiment: 'all' | CommentRecord['sentiment'];
  category: 'all' | CommentRecord['category'];
  search: string;
}

export function useComentarios() {
  const [filters, setFilters] = useState<ComentarioFilters>({
    sentiment: 'all',
    category: 'all',
    search: '',
  });

  const filteredComentarios = useMemo(() => {
    const term = filters.search.trim().toLowerCase();

    return comentarios.filter((comment) => {
      const matchesSentiment =
        filters.sentiment === 'all' || comment.sentiment === filters.sentiment;
      const matchesCategory =
        filters.category === 'all' || comment.category === filters.category;
      const matchesSearch =
        term.length === 0 ||
        comment.client.toLowerCase().includes(term) ||
        comment.text.toLowerCase().includes(term) ||
        comment.category.toLowerCase().includes(term);

      return matchesSentiment && matchesCategory && matchesSearch;
    });
  }, [filters]);

  return {
    comentarios: filteredComentarios,
    filters,
    setFilters,
    counts: {
      total: comentarios.length,
      positivos: comentarios.filter((item) => item.sentiment === 'Positivo').length,
      neutrales: comentarios.filter((item) => item.sentiment === 'Neutral').length,
      negativos: comentarios.filter((item) => item.sentiment === 'Negativo').length,
    },
  };
}
