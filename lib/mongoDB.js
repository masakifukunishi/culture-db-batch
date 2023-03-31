const { MongoClient } = require("mongodb");
require("dotenv").config();
const connect = async (operation) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    db = client.db("culture-db");
    const collection = db.collection("countries");
    return await operation(collection);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

const getCountries = async () => {
  return connect(async (collection) => {
    const cursor = collection.find();
    return await cursor.toArray();
  });
};

const insertCountries = async (countries) => {
  return connect(async (collection) => {
    return await collection.insertMany(countries);
  });
};

module.exports = { getCountries, insertCountries };
