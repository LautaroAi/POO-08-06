// Services/SubscriptionService.ts
import { ISubscriptionRepository } from '../Repositories/ISubscriptionRepository';
import { PlanFactory } from '../Factories/PlanFactory';
import { Subscription } from '../Models/Subscription';
import { v4 as uuidv4 } from 'uuid';

export class SubscriptionService {
  constructor(
    private subRepo: ISubscriptionRepository,
    private planFactory: PlanFactory
  ) {}

  subscribeUser(userId: string, planType: string): Subscription {
    const plan = this.planFactory.createPlan(planType);
    const subscription: Subscription = {
      id: uuidv4(),
      userId,
      planName: plan.name,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
      status: 'active'
    };
    this.subRepo.save(subscription);
    return subscription;
  }
}