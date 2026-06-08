// Factories/NotificationFactory.ts
import { INotifier } from '../Notifications/INotifier';
import { EmailNotifier } from '../Notifications/EmailNotifier';
import { SmsNotifier } from '../Notifications/SmsNotifier';
import { PushNotifier } from '../Notifications/PushNotifier';

export class NotificationFactory {
  createNotifier(channel: string): INotifier {
    switch (channel) {
      case 'email': return new EmailNotifier();
      case 'sms': return new SmsNotifier();
      case 'push': return new PushNotifier();
      default: throw new Error(`Canal no soportado: ${channel}`);
    }
  }
}