// const mongoose = require('mongoose')

// const connectDB = (url) => {
//     return mongoose.connect(url, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true,
//     })
// }

// module.exports = { connectDB }


// const { MongoClient } = require('mongodb');

// const uri = 'mongodb+srv://GarvitJainBanzal:Garvitjb27250@taskmanager.o5vflbh.mongodb.net/?retryWrites=true&w=majority';
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// let db;

// async function connect() {
//     await client.connect();
//     console.log('Connected to MongoDB');

//     db = client.db('BAAZ_API');
// }

// function getDb() {
//     if (!db) {
//         throw new Error('Database not connected');
//     }
//     return db;
// }

// module.exports = { connect, getDb };
