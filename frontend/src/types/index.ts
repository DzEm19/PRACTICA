export type ViewKey =
  | 'dashboard'
  | 'clientes'
  | 'comentarios'
  | 'analisisNLP'
  | 'metricas'
  | 'optimizacion'
  | 'reportes';

export interface KpiCard {
  label: string;
  value: string;
  detail: string;
  trend: string;
  tone: 'positive' | 'neutral' | 'warning';
}

export interface CategoryMetric {
  name: string;
  value: number;
  color: string;
}

export interface WordCloudItem {
  word: string;
  size: number;
}

export interface MetricBar {
  label: string;
  value: number;
  target: number;
}

export interface ActivityItem {
  id: number;
  title: string;
  detail: string;
  time: string;
  type: 'success' | 'info' | 'warning';
}

export interface ClientRecord {
  id: number;
  name: string;
  company: string;
  email: string;
  status: 'Activo' | 'Pendiente' | 'Atención';
  satisfaction: number;
}

export interface CommentRecord {
  id: number;
  client: string;
  sentiment: 'Positivo' | 'Neutral' | 'Negativo';
  category: 'Soporte' | 'Ventas' | 'Reclamo' | 'Consulta' | 'Felicitación';
  text: string;
  responseTime: string;
}

export interface MetricSnapshot {
  label: string;
  value: string;
  description: string;
}

export interface OptimizationScenario {
  name: string;
  description: string;
  impact: string;
  roi: string;
  status: 'Disponible' | 'En prueba' | 'Pendiente';
}

export interface ReportRow {
  name: string;
  value: string;
  change: string;
}
