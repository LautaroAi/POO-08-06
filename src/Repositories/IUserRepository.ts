// Repositories/IUserRepository.ts
import { User } from '../Models/User';
export interface IUserRepository {
  save(user: User): void;
  findById(id: string): User | undefined;
  findByEmail(email: string): User | undefined;
  update(user: User): void;
  delete(id: string): void;
}