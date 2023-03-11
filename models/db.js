const mongoose = require('mongoose');
require('dotenv').config();

const db = mongoose.connect(process.env.URL);

mongoose.set('strictQuery', false);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db');
});

mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error: ${err.massage}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Connection closed (');
    process.exit(1);
  });
});

module.exports = db;
