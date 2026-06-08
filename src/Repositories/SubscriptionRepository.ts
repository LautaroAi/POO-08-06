import { Database } from '../Config/Database';
import { Subscription } from '../Models/Subscription';
import { ISubscriptionRepository } from './ISubscriptionRepository';

export class SubscriptionRepository implements ISubscriptionRepository {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  save(subscription: Subscription): void {
    this.db.getCollection('subscriptions').set(subscription.id, { ...subscription });
  }

  findByUserId(userId: string): Subscription[] {
    const result: Subscription[] = [];
    for (const sub of this.db.getCollection('subscriptions').values()) {
      if (sub.userId === userId) result.push({ ...sub });
    }
    return result;
  }

  findById(id: string): Subscription | undefined {
    const sub = this.db.getCollection('subscriptions').get(id);
    return sub ? { ...sub } : undefined;
  }

  update(subscription: Subscription): void {
    if (this.db.getCollection('subscriptions').has(subscription.id)) {
      this.db.getCollection('subscriptions').set(subscription.id, { ...subscription });
    }
  }

  delete(id: string): void {
    this.db.getCollection('subscriptions').delete(id);
  }
}