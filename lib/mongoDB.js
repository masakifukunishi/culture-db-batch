const { MongoClient } = require("mongodb");
require("dotenv").config();
const connect = async (collectionName, operation) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    db = client.db("culture-db");
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

const insertCountries = async (countries) => {
  return connect("countries", async (collection) => {
    return await collection.insertMany(countries);
  });
};

const insertCities = async (cities) => {
  return connect("cities", async (collection) => {
    return await collection.insertMany(cities);
  });
};

module.exports = { getCountries, insertCountries, insertCities };
