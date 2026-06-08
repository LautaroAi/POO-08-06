import { INotifier } from './INotifier';

export class PushNotifier implements INotifier {
  send(target: string, message: string): void {
    console.log(`[PUSH] Enviando a ${target}: ${message}`);
  }
}