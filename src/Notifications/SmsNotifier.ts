import { INotifier } from './INotifier';

export class SmsNotifier implements INotifier {
  send(target: string, message: string): void {
    console.log(`[SMS] Enviando a ${target}: ${message}`);
  }
}