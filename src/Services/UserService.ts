// Services/UserService.ts
import { IUserRepository } from '../Repositories/IUserRepository';
import { User } from '../Models/User';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
  constructor(private userRepo: IUserRepository) {}

  registerUser(name: string, email: string, preferredNotification: string): User {
    const id = uuidv4();
    const user: User = { id, name, email, preferredNotification: preferredNotification as any, active: false };
    this.userRepo.save(user);
    return user;
  }
}