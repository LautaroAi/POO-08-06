// Services/PaymentService.ts (Subject)
import { IObserver } from '../Observers/IObserver';
import { IInvoiceRepository } from '../Repositories/IInvoiceRepository';
import { Invoice } from '../Models/Invoice';
import { v4 as uuidv4 } from 'uuid';

export class PaymentService {
  private observers: IObserver[] = [];

  constructor(private invoiceRepo: IInvoiceRepository) {}

  attach(observer: IObserver): void {
    this.observers.push(observer);
  }

  detach(observer: IObserver): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  private notify(eventData: any): void {
    for (const obs of this.observers) {
      obs.update(eventData);
    }
  }

  processPayment(userId: string, amount: number, details: string): void {
    // Generar factura
    const invoice: Invoice = {
      id: uuidv4(),
      userId,
      amount,
      date: new Date(),
      details
    };
    this.invoiceRepo.save(invoice);
    console.log(`[PAGO] Procesado: $${amount} de ${userId}`);

    // Notificar a observadores
    this.notify({
      userId,
      amount,
      message: `Pago exitoso por $${amount}. Factura #${invoice.id}`,
      invoiceId: invoice.id
    });
  }
}