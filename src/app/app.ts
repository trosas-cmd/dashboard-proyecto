import { Component, OnInit, computed, signal } from '@angular/core';
import { fetchProjectMetrics, ProjectMetric } from '../api';
import { GraficoDeBarras, PuntoGrafico } from './components/grafico-de-barras/grafico-de-barras';
import { GraficoDeLineas } from './components/grafico-de-lineas/grafico-de-lineas';
import { TarjetaMetrica } from './components/tarjeta-metrica/tarjeta-metrica';

@Component({
  selector: 'app-root',
  imports: [GraficoDeBarras, GraficoDeLineas, TarjetaMetrica],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  // 1. Estado para almacenar las métricas de los proyectos
  protected readonly metricas = signal<ProjectMetric[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);

  // Datos derivados para los gráficos
  protected readonly tareasPorProyecto = computed<PuntoGrafico[]>(() =>
    this.metricas().map((m) => ({ etiqueta: m.nombre, valor: m.tareasCompletadas })),
  );
  protected readonly bugsPorProyecto = computed<PuntoGrafico[]>(() =>
    this.metricas().map((m) => ({ etiqueta: m.nombre, valor: m.bugsReportados })),
  );
  protected readonly horasPorProyecto = computed<PuntoGrafico[]>(() =>
    this.metricas().map((m) => ({ etiqueta: m.nombre, valor: m.horasRegistradas })),
  );

  // Totales para las tarjetas KPI
  protected readonly totalTareas = computed(() => this.suma('tareasCompletadas'));
  protected readonly totalBugs = computed(() => this.suma('bugsReportados'));
  protected readonly totalHoras = computed(() => this.suma('horasRegistradas'));

  // 2. Llamar a fetchProjectMetrics al inicializar el componente
  ngOnInit(): void {
    this.cargarMetricas();
  }

  protected async cargarMetricas(): Promise<void> {
    this.cargando.set(true);
    this.error.set(null);
    try {
      this.metricas.set(await fetchProjectMetrics());
    } catch {
      this.error.set('No se pudieron cargar las métricas.');
    } finally {
      this.cargando.set(false);
    }
  }

  private suma(campo: 'tareasCompletadas' | 'bugsReportados' | 'horasRegistradas'): number {
    return this.metricas().reduce((acc, m) => acc + m[campo], 0);
  }
}
