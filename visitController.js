const Visit = require('./visitModel');

module.exports = {
  //post visit using userId and name as key
  postVisit(req, res) {
    Visit.create(req.body, (err, result) => {
      console.log('this is the document to be created', req.body);
      if (err) return res.status(418).send('error, did not go through');
      res.send(result);
    })
  }
}