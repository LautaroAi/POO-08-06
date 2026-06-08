// Controllers/SubscriptionController.ts
import { SubscriptionService } from '../Services/SubscriptionService';
import { PaymentService } from '../Services/PaymentService';
import { User } from '../Models/User';

export class SubscriptionController {
  constructor(
    private subService: SubscriptionService,
    private paymentService: PaymentService
  ) {}

  subscribe(user: User, planType: string): void {
    console.log(`\n--- Suscribiendo a ${user.name} al plan ${planType} ---`);
    const sub = this.subService.subscribeUser(user.id, planType);
    console.log(`Suscripción activa: ${sub.id}`);

    // Procesar el pago (simulación)
    const plan = this.subService['planFactory'].createPlan(planType);
    this.paymentService.processPayment(
      user.id,
      plan.price,
      `Pago por suscripción ${plan.name}`
    );
  }
}