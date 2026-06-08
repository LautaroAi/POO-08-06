// Factories/PlanFactory.ts
import { Plan, FreePlan, PremiumPlan } from '../Models/Plan';

export class PlanFactory {
  createPlan(type: string): Plan {
    switch (type.toLowerCase()) {
      case 'free': return new FreePlan();
      case 'premium': return new PremiumPlan();
      default: throw new Error(`Tipo de plan no soportado: ${type}`);
    }
  }
}