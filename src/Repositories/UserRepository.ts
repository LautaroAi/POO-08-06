// Repositories/UserRepository.ts
import { Database } from '../Config/Database';
import { User } from '../Models/User';
import { IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  save(user: User): void {
    this.db.getCollection('users').set(user.id, { ...user });
  }

  findById(id: string): User | undefined {
    const user = this.db.getCollection('users').get(id);
    return user ? { ...user } : undefined;
  }

  findByEmail(email: string): User | undefined {
    for (const user of this.db.getCollection('users').values()) {
      if (user.email === email) return { ...user };
    }
    return undefined;
  }

  update(user: User): void {
    if (this.db.getCollection('users').has(user.id)) {
      this.db.getCollection('users').set(user.id, { ...user });
    }
  }

  delete(id: string): void {
    this.db.getCollection('users').delete(id);
  }
}