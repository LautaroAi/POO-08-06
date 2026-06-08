// Notifications/EmailNotifier.ts
import { INotifier } from './INotifier';

export class EmailNotifier implements INotifier {
  send(target: string, message: string): void {
    console.log(`[EMAIL] Enviando a ${target}: ${message}`);
  }
}