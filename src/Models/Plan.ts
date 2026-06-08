// Models/Plan.ts
export abstract class Plan {
  abstract name: string;
  abstract price: number;
  abstract features: string[];
  abstract getDescription(): string;
}

export class FreePlan extends Plan {
  name = 'Free';
  price = 0;
  features = ['acceso básico'];
  getDescription() { return 'Plan gratuito con funcionalidades limitadas'; }
}

export class PremiumPlan extends Plan {
  name = 'Premium';
  price = 9.99;
  features = ['acceso completo', 'soporte prioritario', 'sin anuncios'];
  getDescription() { return 'Plan premium con todas las características'; }
}