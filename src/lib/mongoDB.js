import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

class MongoDB {
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI);
  }

  async connect(collectionName, operation) {
    try {
      await this.client.connect();
      const db = this.client.db("culture-db");
      const collection = db.collection(collectionName);
      return await operation(collection);
    } catch (e) {
      console.error(e);
    } finally {
      await this.client.close();
    }
  }

  async getCountries() {
    return this.connect("countries", async (collection) => {
      const cursor = collection.find();
      return await cursor.toArray();
    });
  }

  async insertMany(collectionName, array) {
    return this.connect(collectionName, async (collection) => {
      return await collection.insertMany(array);
    });
  }

  async updateField(collectionName, whereID, fieldName, param) {
    return this.connect(collectionName, async (collection) => {
      return await collection.updateOne({ _id: whereID }, { $set: { [fieldName]: param } });
    });
  }

  async updateArrayField(collectionName, whereID, whereKey, whereValue, fieldName, param) {
    return this.connect(collectionName, async (collection) => {
      return await collection.updateOne({ _id: whereID, [whereKey]: whereValue }, { $set: { [fieldName]: param } });
    });
  }
}

export default MongoDB;
