const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const db = mongoose.connection;
const bodyParser = require('body-parser');
const visitController = require('./visitController');

//declare my local Mongo URI
const mongoURI = process.env.MONGO_URI || 'mongodb://suarez.ben12:developer12@ds243335.mlab.com:43335/benizra';
const PORT = 3000;

//connect to monggoose
mongoose.connect(mongoURI, { useMongoClient: true });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to Database');
});

//use bodyParser to parse req body 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//define requests with appropriate middleware
app.post('/visit', visitController.postVisit);


app.listen(PORT, () => console.log(`listening to PORT ${PORT}`));