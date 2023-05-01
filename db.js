const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connect() {
    await client.connect();
    console.log('Connected to MongoDB');

    db = client.db('BAAZ_API');
}

function getDb() {
    if (!db) {
        throw new Error('Database not connected');
    }
    return db;
}

module.exports = { connect, getDb };