// Observers/AccessControlObserver.ts
import { IObserver } from './IObserver';
import { IUserRepository } from '../Repositories/IUserRepository';

export class AccessControlObserver implements IObserver {
  constructor(private userRepo: IUserRepository) {}

  update(eventData: any): void {
    const { userId } = eventData;
    const user = this.userRepo.findById(userId);
    if (user) {
      user.active = true;
      this.userRepo.update(user);
      console.log(`[ACCESO] Acceso premium activado para ${user.name}`);
    }
  }
}