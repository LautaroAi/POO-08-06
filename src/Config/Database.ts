// Config/Database.ts
export class Database {
  private static instance: Database;
  private collections: Map<string, Map<string, any>> = new Map();

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getCollection(name: string): Map<string, any> {
    if (!this.collections.has(name)) {
      this.collections.set(name, new Map<string, any>());
    }
    return this.collections.get(name)!;
  }
}