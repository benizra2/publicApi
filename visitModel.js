const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//setting schema for POST to /visit 
let visitSchema = new Schema ({
  "userId": {type: String, required: true},
  "name": {type: String, required: true},
})

let Movies = mongoose.model('Movie', movieSchema);
module.exports = Movies;