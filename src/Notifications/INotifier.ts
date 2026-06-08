// Notifications/INotifier.ts
export interface INotifier {
  send(target: string, message: string): void;
}