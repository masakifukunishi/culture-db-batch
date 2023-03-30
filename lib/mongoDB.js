const { MongoClient } = require("mongodb");
require("dotenv").config();

async function getCollection() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    db = client.db("culture-db");
    const collectiuon = db.collection("countries");
    const cursor = collectiuon.find();
    const res = await cursor.toArray();
    return res;
  } catch (e) {
    console.error(e);
    await client.close();
  } finally {
    await client.close();
  }
}

module.exports = { getCollection };
