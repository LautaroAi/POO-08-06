# Sistema de Gestión de Suscripciones y Facturación Premium

### Alumno: Lautaro Rivieri

# Consigna de Proyecto:

## Objetivo

Diseñar e implementar el backend de una aplicación de consola o API REST que gestione usuarios, planes de suscripción y pagos automáticos. El objetivo principal es construir una arquitectura limpia, desacoplada y altamente escalable aplicando **principios SOLID** y **patrones de diseño específicos**.

- Lenguaje de programación: TypeScript
- Gestión de proyecto: Github Project
- Control de Versión: Github
- Desplegar en Docker

## 🛡️ Requisitos Arquitectónicos (Patrones a Implementar)

Para que el ejercicio sea válido, cada uno de los siguientes patrones debe cumplir un rol específico dentro del sistema:

### 1\. Singleton (Patrón Creacional)

* **Caso de uso:** Conexión a la Base de Datos o Gestor de Configuración General.  
* **Misión:** Crear una clase `DatabaseConnection` o `AppConfig` que asegure una **única instancia** en todo el ciclo de vida de la aplicación, proporcionando un punto de acceso global para simular la persistencia de datos (por ejemplo, en memoria usando listas/diccionarios).

### 2\. Factory Method (Patrón Creacional)

* **Caso de uso:** Sistema de Notificaciones (Email, SMS, Push) o Tipos de Planes de Suscripción.  
* **Misión:** Crear una clase abstracta o interfaz de notificaciones. Implementar una fábrica (`NotificationFactory`) que, basada en la preferencia del usuario, instancie dinámicamente el canal correcto sin que el cliente conozca la lógica de creación.

### 3\. Repository Pattern (Patrón Estructural)

* **Caso de uso:** Abstracción del acceso a datos para Entidades (`User`, `Subscription`).  
* **Misión:** Crear las interfaces `IUserRepository` e `ISubscriptionRepository` con operaciones CRUD básicas. Las implementaciones concretas interactuarán con la instancia de tu base de datos en memoria (el *Singleton*), aislando la lógica de negocio de los detalles del almacenamiento.

### 4\. Observer (Patrón Comportamiento)

* **Caso de uso:** Eventos posteriores a un pago exitoso o renovación de suscripción.  
* **Misión:** El `PaymentService` actuará como el *Sujeto (Subject)*. Cuando un usuario realice un pago, el sistema debe notificar automáticamente a múltiples *Observadores (Observers)*, por ejemplo:  
  * `EmailNotificationObserver` (para enviar la factura).  
  * `MetricsServiceObserver` (para actualizar métricas de ingresos).  
  * `AccessControlObserver` (para activar los accesos premium del usuario).

### 5\. Model-View-Controller (MVC)

* **Caso de uso:** Flujo de interacción del sistema.  
* **Model:** Clases puras de datos/entidades (`User`, `Subscription`, `Invoice`).  
* **Controller:** Controladores (`UserController`, `SubscriptionController`) que reciben la entrada de la vista, coordinan los servicios de negocio y devuelven la respuesta.  
* **View:** Si es app de consola, una interfaz CLI interactiva; si es API, los controladores de endpoints que retornan JSON.

## ⚖️ Checklist de Cumplimiento SOLID

El código será evaluado rigurosamente bajo los siguientes estándares:

* **S (Single Responsibility):** Cada clase debe hacer **una sola cosa**. El controlador solo maneja el flujo, el repositorio solo datos, el servicio solo lógica, y los modelos solo datos de entidad.  
* **O (Open/Closed):** Si mañana se agrega un nuevo método de pago (ej. Criptomonedas) o un nuevo canal de notificación (ej. WhatsApp), se debe poder hacer **creando una nueva clase**, sin modificar el código existente.  
* **L (Liskov Substitution):** Cualquier tipo de plan (ej. `FreePlan`, `PremiumPlan`) que herede de una clase base `Plan` debe poder usarse indistintamente sin romper el comportamiento del sistema.  
* **I (Interface Segregation):** No crees una interfaz gigante para todo el sistema. Separa las interfaces de lectura/escritura si es necesario, o mantén interfaces específicas como `INotifier`, `IPaymentProcessor` y `IRepository`.  
* **D (Dependency Inversion):** Los controladores y servicios de alto nivel **no deben depender de clases concretas**. Todo debe inyectarse a través de abstracciones (interfaces) en los constructores.

## 🛠️ Flujo de Usuario a Implementar (Historias de Usuario)

1. **Registro e Inicio:** Un usuario se registra en el sistema. El controlador recibe la petición, invoca al servicio, este usa el repositorio para guardar los datos y el singleton asegura la persistencia.  
2. **Suscripción a un Plan:** El usuario elige un plan (creado mediante la *Factory*). El `SubscriptionController` procesa el alta.  
3. **Procesamiento de Pago (El core del ejercicio):** \* El usuario realiza el pago de su suscripción.  
   * El servicio de pago procesa la transacción.  
   * Al completarse, el patrón **Observer** se dispara y, en cadena, se genera la factura, se envía la notificación (vía *Factory*) y se actualizan los accesos.

## 📝 Entregables


1. **Diagrama de Clases UML:** Un esquema donde se visualice claramente cómo interactúan los patrones (especialmente cómo el *Controller* usa el *Repository* y cómo el *Observer* se desacopla del servicio principal).

![Diagrama de clases UML](/images/SGSyFP.png)

2. **Código Fuente Organizado:** Estructura de carpetas limpia y profesional:  

```
    ├── src/  
    │   ├── Models/  
    │   ├── Views/  
    │   ├── Controllers/  
    │   ├── Repositories/  
    │   ├── Services/ (Lógica de negocio, procesadores, etc.)  
    │   ├── Factories/  
    │   ├── Observers/  
    │   └── Config/ (Singleton de Base de Datos)
```

3. **Prueba de Concepto (Main / Seeds):** Un archivo principal que configure las dependencias al arrancar (Simulación de un contenedor IoC) y ejecute un flujo completo automáticamente en la consola para demostrar que todo el engranaje funciona sin errores.

### Como ejecutar: 

Inicializa el proyecto Node:
- `npm init -y`

Instala TypeScript y las dependencias necesarias:
- `npm install typescript ts-node uuid`
- `npm install -D @types/node @types/uuid`

Ejecución directa:
- `npx ts-node src/main.ts`


### [**Subir ⬆**](#sistema-de-gestión-de-suscripciones-y-facturación-premium)
