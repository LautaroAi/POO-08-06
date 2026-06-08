// Controllers/UserController.ts
import { UserService } from '../Services/UserService';
import { User } from '../Models/User';

export class UserController {
  constructor(private userService: UserService) {}

  register(name: string, email: string, prefNotification: string): User {
    console.log(`\n--- Registrando usuario: ${name} ---`);
    const user = this.userService.registerUser(name, email, prefNotification);
    console.log(`Usuario creado: ${user.id}`);
    return user;
  }
}