import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connect = async (collectionName, operation) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    let db = client.db("culture-db");
    const collection = db.collection(collectionName);
    return await operation(collection);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

const getCountries = async () => {
  return connect("countries", async (collection) => {
    const cursor = collection.find();
    return await cursor.toArray();
  });
};

const insertMany = async (collectionName, array) => {
  return connect(collectionName, async (collection) => {
    return await collection.insertMany(array);
  });
};

const updateField = async (collectionName, id, fieldName, param) => {
  return connect(collectionName, async (collection) => {
    return await collection.updateOne({ _id: id }, { $set: { [fieldName]: param } });
  });
};

export default { getCountries, insertMany, updateField };
