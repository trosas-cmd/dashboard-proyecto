import { Component, computed, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { PuntoGrafico } from '../grafico-de-barras/grafico-de-barras';

/**
 * Componente reutilizable de gráfico de líneas.
 * Uso: <app-grafico-de-lineas titulo="..." [datos]="[...]" />
 */
@Component({
  selector: 'app-grafico-de-lineas',
  imports: [BaseChartDirective],
  template: `
    <section class="card">
      <h2>{{ titulo() }}</h2>
      <div class="chart-box">
        <canvas baseChart type="line" [data]="chartData()" [options]="options"></canvas>
      </div>
    </section>
  `,
  styleUrl: '../grafico.css',
})
export class GraficoDeLineas {
  readonly titulo = input.required<string>();
  readonly datos = input.required<PuntoGrafico[]>();
  readonly color = input<string>('#ef4444');
  readonly serie = input<string>('Valor');

  protected readonly chartData = computed<ChartData<'line'>>(() => ({
    labels: this.datos().map((d) => d.etiqueta),
    datasets: [
      {
        label: this.serie(),
        data: this.datos().map((d) => d.valor),
        borderColor: this.color(),
        backgroundColor: this.color() + '33',
        fill: true,
        tension: 0.35,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  }));

  protected readonly options: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };
}
