// Models/Invoice.ts
export interface Invoice {
  id: string;
  userId: string;
  amount: number;
  date: Date;
  details: string;
}