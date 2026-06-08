// Observers/IObserver.ts
export interface IObserver {
  update(eventData: any): void;
}