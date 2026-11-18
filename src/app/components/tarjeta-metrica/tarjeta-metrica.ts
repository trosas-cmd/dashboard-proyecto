import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

/** Tarjeta KPI reutilizable: muestra una etiqueta y un valor total. */
@Component({
  selector: 'app-tarjeta-metrica',
  imports: [DecimalPipe],
  template: `
    <div class="kpi" [style.border-top-color]="color()">
      <span class="label">{{ etiqueta() }}</span>
      <span class="value">{{ valor() | number }}</span>
    </div>
  `,
  styles: `
    .kpi {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-top: 4px solid;
      border-radius: 12px;
      padding: 1rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .label { color: #6b7280; font-size: 0.85rem; }
    .value { font-size: 1.75rem; font-weight: 700; color: #111827; }
  `,
})
export class TarjetaMetrica {
  readonly etiqueta = input.required<string>();
  readonly valor = input.required<number>();
  readonly color = input<string>('#3b82f6');
}
