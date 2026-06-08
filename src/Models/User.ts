// Models/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
  preferredNotification: 'email' | 'sms' | 'push';
  active: boolean;
}