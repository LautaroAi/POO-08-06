import { Subscription } from '../Models/Subscription';

export interface ISubscriptionRepository {
  save(subscription: Subscription): void;
  findByUserId(userId: string): Subscription[];
  findById(id: string): Subscription | undefined;
  update(subscription: Subscription): void;
  delete(id: string): void;
}