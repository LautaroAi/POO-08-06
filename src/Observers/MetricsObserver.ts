// Observers/MetricsObserver.ts
import { IObserver } from './IObserver';

export class MetricsObserver implements IObserver {
  public totalRevenue: number = 0;

  update(eventData: any): void {
    if (eventData.amount) {
      this.totalRevenue += eventData.amount;
      console.log(`[MÉTRICAS] Ingreso total actualizado: $${this.totalRevenue.toFixed(2)}`);
    }
  }
}