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
  }, 
  //expected values either req.visitId or ( req.userId && searchString );
  getVisit(req, res) {
    console.log("hit getrequest");
    // console.log("this is request", req);
    // console.log("this is req.body", req.body);
    // console.log("this is the url", req.url);

    //obtains URL params
    let rawParams = req.url.slice(req.url.indexOf('?') + 1).split('&');
    console.log("these are rawParams", rawParams);
    //declare obj to store key-val of params
    let params = {}
    //iterate over rawParam array to extract key-val pairs and set it in params obj
    rawParams.map(rawParam => {
        let [key, val] = rawParam.split('=')
        params[key] = decodeURIComponent(val)
    })
    console.log("this is params", params);
    //set up findObj. Check if visitId exisits. if it is use that to find in database.    
    const findObj = {};
    if (params.visitId) {
      findObj._id = params.visitId;
    //otherwise use userId;
    } else {
      findObj.userId = params.userId;
    }
    console.log("this is findObj", findObj);

    //query findObj in DB;
    Visit.find(findObj, (err, result) => {
      if (err) res.status(418).send("error");
      console.log("this is the result", result);
      res.send(result);
    });
  }
}