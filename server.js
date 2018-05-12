const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const db = mongoose.connection;
const bodyParser = require('body-parser');
const visitController = require('./visitController');

//set port for heroku purposes
app.set('port', (process.env.PORT || 3000));

//declare my local Mongo URI
const mongoURI = process.env.MONGO_URI || 'mongodb://current:current@ds243335.mlab.com:43335/benizra';

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
app.get('/visit', visitController.getVisit);

//set up listening to port 3000
app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));
