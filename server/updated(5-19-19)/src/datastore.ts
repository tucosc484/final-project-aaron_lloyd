import { Collection, MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const URL = process.env.MONGO_CONNECTION || '';

export class OrdersDatastore {
  users: Collection;

  constructor(client: MongoClient) {
    this.users = client.db().collection('users');
  }
  
  static async connect() {
    return new Promise<MongoClient>((resolve, reject) =>
      MongoClient.connect(URL, async (err: Error, client: MongoClient) => {
        if (err) {
          reject(err);
        }
        resolve(client);
      }));
  }

  async readAllUsers() {
    return await this.users.find({}).toArray();
  }

  async createUser(username: string, password: string, email: string ) {
    await this.users.insertOne({ username, password, email });
  }

  async deleteUser(id: string) {
    await this.users.deleteOne({ _id: new ObjectId(id) });
  }
}
