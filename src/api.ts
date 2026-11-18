/**
 * API REST simulada.
 * Simula una llamada de red que tarda 1 segundo y devuelve las métricas de los proyectos.
 */

export interface ProjectMetric {
  nombre: string;
  tareasCompletadas: number;
  bugsReportados: number;
  horasRegistradas: number;
}

const MOCK_METRICS: ProjectMetric[] = [
  { nombre: 'Portal Clientes', tareasCompletadas: 48, bugsReportados: 7, horasRegistradas: 320 },
  { nombre: 'App Móvil', tareasCompletadas: 35, bugsReportados: 12, horasRegistradas: 275 },
  { nombre: 'API Pagos', tareasCompletadas: 62, bugsReportados: 4, horasRegistradas: 410 },
  { nombre: 'Backoffice', tareasCompletadas: 27, bugsReportados: 9, horasRegistradas: 198 },
  { nombre: 'Data Lake', tareasCompletadas: 41, bugsReportados: 5, horasRegistradas: 356 },
];

/**
 * Simula una petición HTTP GET /api/metrics.
 * @param delayMs tiempo de respuesta simulado (por defecto 1000 ms)
 */
export async function fetchProjectMetrics(delayMs = 1000): Promise<ProjectMetric[]> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  // Se simula la serialización JSON de una respuesta real
  return JSON.parse(JSON.stringify(MOCK_METRICS)) as ProjectMetric[];
}
