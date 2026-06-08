import { Invoice } from '../Models/Invoice';

export interface IInvoiceRepository {
  save(invoice: Invoice): void;
  findById(id: string): Invoice | undefined;
}