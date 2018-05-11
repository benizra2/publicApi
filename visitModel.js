const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//setting schema for POST to /visit 
let visitSchema = new Schema ({
  "userId": {type: String, required: true},
  "name": {type: String, required: true},
})

const Visit = mongoose.model('Visit', visitSchema);
module.exports = Movies;