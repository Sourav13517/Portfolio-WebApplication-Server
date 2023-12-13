const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DATABASE_NAME;

let client;

async function connectToDatabase() {
  try {
    if (client){
        return (client);
    }
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

function getClient() {
  return client;
}

function getDatabase() {
  return client.db(dbName);
}

module.exports = {
  connectToDatabase,
  getClient,
  getDatabase,
};