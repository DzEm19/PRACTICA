import { useMemo } from 'react';
import {
  activityFeed,
  categoryMetrics,
  clientes,
  comentarios,
  kpiCards,
  metricBars,
  wordCloud,
} from '../services/api';

export function useDashboardData() {
  return useMemo(() => ({
    kpis: kpiCards,
    categories: categoryMetrics,
    comments: comentarios,
    clients: clientes,
    activity: activityFeed,
    metrics: metricBars,
    words: wordCloud,
  }), []);
}
