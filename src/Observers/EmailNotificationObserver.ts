// Observers/EmailNotificationObserver.ts
import { IObserver } from './IObserver';
import { NotificationFactory } from '../Factories/NotificationFactory';
import { IUserRepository } from '../Repositories/IUserRepository';

export class EmailNotificationObserver implements IObserver {
  constructor(
    private notifierFactory: NotificationFactory,
    private userRepo: IUserRepository
  ) {}

  update(eventData: any): void {
    const { userId, message } = eventData;
    const user = this.userRepo.findById(userId);
    if (user) {
      const notifier = this.notifierFactory.createNotifier(user.preferredNotification);
      notifier.send(user.email, message);
    }
  }
}