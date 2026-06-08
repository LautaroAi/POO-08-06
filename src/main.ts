import { Database } from './Config/Database';
import { UserRepository } from './Repositories/UserRepository';
import { SubscriptionRepository } from './Repositories/SubscriptionRepository';
import { InvoiceRepository } from './Repositories/InvoiceRepository';
import { PlanFactory } from './Factories/PlanFactory';
import { NotificationFactory } from './Factories/NotificationFactory';
import { EmailNotificationObserver } from './Observers/EmailNotificationObserver';
import { MetricsObserver } from './Observers/MetricsObserver';
import { AccessControlObserver } from './Observers/AccessControlObserver';
import { UserService } from './Services/UserService';
import { SubscriptionService } from './Services/SubscriptionService';
import { PaymentService } from './Services/PaymentService';
import { UserController } from './Controllers/UserController';
import { SubscriptionController } from './Controllers/SubscriptionController';

// Simulación de Contenedor IoC
const db = Database.getInstance();
const userRepo = new UserRepository();
const subRepo = new SubscriptionRepository();
const invoiceRepo = new InvoiceRepository();
const planFactory = new PlanFactory();
const notificationFactory = new NotificationFactory();

const userService = new UserService(userRepo);
const subscriptionService = new SubscriptionService(subRepo, planFactory);
const paymentService = new PaymentService(invoiceRepo);

// Observers
const emailObs = new EmailNotificationObserver(notificationFactory, userRepo);
const metricsObs = new MetricsObserver();
const accessObs = new AccessControlObserver(userRepo);

paymentService.attach(emailObs);
paymentService.attach(metricsObs);
paymentService.attach(accessObs);

// Controladores
const userCtrl = new UserController(userService);
const subCtrl = new SubscriptionController(subscriptionService, paymentService);

// --- Ejecución del flujo ---
console.log('=== SISTEMA DE GESTIÓN DE SUSCRIPCIONES ===');

// 1. Registrar usuario
const user = userCtrl.register('Ana López', 'ana@example.com', 'email');

// 2. Suscribir a plan Premium
subCtrl.subscribe(user, 'premium');

// 3. Mostrar métricas finales
console.log(`\n[MÉTRICAS] Total recaudado: $${metricsObs.totalRevenue.toFixed(2)}`);
console.log('=== FIN DEL FLUJO ===');