import { Component, computed, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

export interface PuntoGrafico {
  etiqueta: string;
  valor: number;
}

/**
 * Componente reutilizable de gráfico de barras.
 * Uso: <app-grafico-de-barras titulo="..." [datos]="[...]" />
 */
@Component({
  selector: 'app-grafico-de-barras',
  imports: [BaseChartDirective],
  template: `
    <section class="card">
      <h2>{{ titulo() }}</h2>
      <div class="chart-box">
        <canvas baseChart type="bar" [data]="chartData()" [options]="options"></canvas>
      </div>
    </section>
  `,
  styleUrl: '../grafico.css',
})
export class GraficoDeBarras {
  readonly titulo = input.required<string>();
  readonly datos = input.required<PuntoGrafico[]>();
  readonly color = input<string>('#3b82f6');
  readonly serie = input<string>('Valor');

  protected readonly chartData = computed<ChartData<'bar'>>(() => ({
    labels: this.datos().map((d) => d.etiqueta),
    datasets: [
      {
        label: this.serie(),
        data: this.datos().map((d) => d.valor),
        backgroundColor: this.color(),
        borderRadius: 6,
      },
    ],
  }));

  protected readonly options: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };
}
