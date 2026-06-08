import { Database } from '../Config/Database';
import { Invoice } from '../Models/Invoice';
import { IInvoiceRepository } from './IInvoiceRepository';

export class InvoiceRepository implements IInvoiceRepository {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  save(invoice: Invoice): void {
    this.db.getCollection('invoices').set(invoice.id, { ...invoice });
  }

  findById(id: string): Invoice | undefined {
    const inv = this.db.getCollection('invoices').get(id);
    return inv ? { ...inv } : undefined;
  }
}