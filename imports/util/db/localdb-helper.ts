import { Ground } from 'meteor/ground:db';
import { Collection, LocalForage } from './db';

export class LocalDatabase {
  database: Collection;

  constructor(name: string) {
    this.database = new Ground.Collection(name);
  }

  public async setItem(key: string, val: any) {
    return await this.database.storage.setItem(key, val);
  }

  public async getItem(key: string) {
    return await this.database.storage.getItem(key);
  }

  public async clear() {
    this.database.storage.clear();
  }

}

