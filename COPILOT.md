# Bitácora de uso de GitHub Copilot

Pasos del proyecto y modo de Copilot usado en cada uno.

## 1. Creación del proyecto – Modo Agente

> Crea un nuevo proyecto de Angular con TypeScript usando Angular CLI llamado "dashboard-proyecto".

Resultado: `ng new dashboard-proyecto` (componentes standalone, CSS, sin SSR).

## 2. Simulación de la API – Modo Agente

> @workspace crea un archivo 'api.ts' en la carpeta 'src'. Este archivo debe exportar una función asíncrona llamada 'fetchProjectMetrics' que simule una llamada de red y, después de un segundo, devuelva un JSON con un array de datos de proyectos. Cada proyecto debe tener un nombre, tareasCompletadas, bugsReportados y horasRegistradas.

Resultado: `src/api.ts` con la interfaz `ProjectMetric` y `fetchProjectMetrics()`.

## 3. Integración de gráficos – Modo Preguntar

> Quiero mostrar gráficos de barras y de líneas en mi aplicación Angular. ¿Qué biblioteca de gráficos es popular y fácil de usar? Muéstrame cómo instalarla y un ejemplo básico.

Recomendación: **ng2-charts** sobre Chart.js.

```bash
npm install ng2-charts chart.js
```

Configuración en `app.config.ts`:

```ts
provideCharts(withDefaultRegisterables())
```

## 4. Desarrollo del dashboard – Finalizaciones en línea

Comentarios guía escritos en `app.ts` / `app.html`:

```ts
// 1. Crear una propiedad/estado para almacenar las métricas de los proyectos.
// 2. Usar ngOnInit para llamar a fetchProjectMetrics cuando el componente se inicialice.
// 3. Renderizar un título para el dashboard.
// 4. Renderizar un componente de gráfico de barras que muestre las tareas completadas por proyecto.
// 5. Renderizar un componente de gráfico de líneas que muestre los bugs reportados por proyecto.
```

## 5. Refactorización – Modo Edición

Selección del bloque `<canvas baseChart type="bar" ...>` en `app.html`, y el prompt:

> Refactoriza este gráfico de barras en un nuevo componente reutilizable llamado 'GraficoDeBarras'. Debe aceptar 'titulo' y 'datos' como propiedades (props/inputs).

Resultado: `components/grafico-de-barras/`. Se aplicó lo mismo al gráfico de líneas (`GraficoDeLineas`) y a las tarjetas KPI (`TarjetaMetrica`).
