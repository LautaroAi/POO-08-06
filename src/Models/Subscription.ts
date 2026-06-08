// Models/Subscription.ts
export interface Subscription {
  id: string;
  userId: string;
  planName: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'cancelled';
}