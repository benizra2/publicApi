const Visit = require('./visitModel.js');

module.exports = {
  //post visit using userId and name as key
  postVisit(req, res) {
    Visit.create(req.body, (err, result) => {
      console.log('this is the document to be created', req.body);
      if (err) return res.status(418).send('Error, did not go through');
      
      //if successful, returns specified object. Because I'm using mongoDB, 
      //I'm leveraging mongoDB's self-generated _id assigned to each doc as my visitId
      res.send( { visitId:result._id} );
    })
  }
}