import type {
  ActivityItem,
  CategoryMetric,
  ClientRecord,
  CommentRecord,
  KpiCard,
  MetricBar,
  MetricSnapshot,
  OptimizationScenario,
  ReportRow,
  ViewKey,
  WordCloudItem,
} from '../types';

export const menuItems: Array<{ key: ViewKey; label: string; icon: string }> = [
  { key: 'dashboard', label: 'Dashboard', icon: '▣' },
  { key: 'clientes', label: 'Clientes', icon: '◍' },
  { key: 'comentarios', label: 'Comentarios', icon: '☰' },
  { key: 'analisisNLP', label: 'Análisis NLP', icon: '✦' },
  { key: 'metricas', label: 'Métricas', icon: '◔' },
  { key: 'optimizacion', label: 'Optimización', icon: '⬢' },
  { key: 'reportes', label: 'Reportes', icon: '▤' },
];

export const kpiCards: KpiCard[] = [
  { label: 'Clientes', value: '245', detail: '+18 este mes', trend: '+12.4%', tone: 'positive' },
  { label: 'Comentarios', value: '1,248', detail: 'Procesados hoy', trend: '+9.1%', tone: 'positive' },
  { label: 'Tiempo medio', value: '16.4 min', detail: 'Respuesta total', trend: '-3.2%', tone: 'neutral' },
  { label: 'Procesados', value: '94%', detail: 'Cobertura actual', trend: '+2.7%', tone: 'positive' },
];

export const categoryMetrics: CategoryMetric[] = [
  { name: 'Soporte', value: 42, color: '#2db869' },
  { name: 'Ventas', value: 27, color: '#5dc1a8' },
  { name: 'Reclamos', value: 18, color: '#7b9cf8' },
  { name: 'Consultas', value: 13, color: '#f4b740' },
];

export const wordCloud: WordCloudItem[] = [
  { word: 'servicio', size: 1.5 },
  { word: 'atención', size: 1.3 },
  { word: 'rápido', size: 1.1 },
  { word: 'producto', size: 1 },
  { word: 'soporte', size: 1.4 },
  { word: 'respuesta', size: 1.25 },
  { word: 'calidad', size: 1.15 },
  { word: 'solución', size: 1.2 },
  { word: 'satisfacción', size: 1.05 },
  { word: 'ventas', size: 0.95 },
];

export const metricBars: MetricBar[] = [
  { label: 'Atención', value: 78, target: 100 },
  { label: 'NLP', value: 86, target: 100 },
  { label: 'Calidad', value: 92, target: 100 },
  { label: 'Retención', value: 81, target: 100 },
];

export const activityFeed: ActivityItem[] = [
  { id: 1, title: 'Comentarios procesados', detail: 'Se clasificaron 86 nuevos mensajes con NLTK.', time: 'Hace 15 min', type: 'success' },
  { id: 2, title: 'Tiempo de respuesta', detail: 'La media bajó a 16.4 minutos frente a 18.1.', time: 'Hace 42 min', type: 'info' },
  { id: 3, title: 'Reclamos críticos', detail: '4 clientes requieren seguimiento inmediato.', time: 'Hace 1h', type: 'warning' },
  { id: 4, title: 'Segmento ventas', detail: 'El equipo de ventas mejoró su tasa de cierre.', time: 'Hace 2h', type: 'success' },
];

export const clientes: ClientRecord[] = [
  { id: 1, name: 'Ana Gómez', company: 'Apex Soluciones', email: 'ana@apex.com', status: 'Activo', satisfaction: 96 },
  { id: 2, name: 'Mateo Ruiz', company: 'LogisCenter', email: 'mateo@logiscenter.com', status: 'Atención', satisfaction: 88 },
  { id: 3, name: 'Sofía Torres', company: 'Nexa Retail', email: 'sofia@nexa.com', status: 'Pendiente', satisfaction: 82 },
  { id: 4, name: 'Diego Pérez', company: 'BlueWave', email: 'diego@bluewave.com', status: 'Activo', satisfaction: 91 },
];

export const comentarios: CommentRecord[] = [
  { id: 1, client: 'Ana Gómez', sentiment: 'Positivo', category: 'Felicitación', text: 'El servicio fue rápido, amable y muy claro en cada paso.', responseTime: '12 min' },
  { id: 2, client: 'Mateo Ruiz', sentiment: 'Neutral', category: 'Consulta', text: 'Necesito una actualización del proceso de soporte para mi equipo.', responseTime: '21 min' },
  { id: 3, client: 'Sofía Torres', sentiment: 'Negativo', category: 'Reclamo', text: 'El pedido llegó con retraso y la atención fue lenta.', responseTime: '34 min' },
  { id: 4, client: 'Diego Pérez', sentiment: 'Positivo', category: 'Ventas', text: 'Muy buena atención comercial y opciones claras de compra.', responseTime: '15 min' },
];

export const metricSnapshots: MetricSnapshot[] = [
  { label: 'Tiempo promedio', value: '16.4 min', description: 'Promedio de resolución por canal' },
  { label: 'Desviación', value: '4.3 min', description: 'Variabilidad operativa por jornada' },
  { label: 'Máximo', value: '25.0 min', description: 'Peor caso registrados en 30 días' },
  { label: 'Percentil 75', value: '19.2 min', description: 'Tiempo del 75% de los casos' },
];

export const optimizationScenarios: OptimizationScenario[] = [
  { name: 'Rediseño de colas', description: 'Distribuye mejor las tareas entre atención y ventas.', impact: 'Ahorro estimado 12%', roi: '1.9x', status: 'Disponible' },
  { name: 'Automatización de consultas', description: 'Responde FAQ repetitivas con priorización de casos.', impact: 'Reduce tiempos 18%', roi: '2.3x', status: 'En prueba' },
  { name: 'Escalado por prioridad', description: 'Clasifica reclamos con riesgo de churn.', impact: 'Mejora SLA 9%', roi: '1.4x', status: 'Pendiente' },
];

export const reportRows: ReportRow[] = [
  { name: 'Atención al cliente', value: '86.8%', change: '+4.5%' },
  { name: 'NLP precisión', value: '92.1%', change: '+2.2%' },
  { name: 'Satisfacción', value: '89.6%', change: '+6.1%' },
  { name: 'Retención', value: '78.3%', change: '+3.8%' },
];
