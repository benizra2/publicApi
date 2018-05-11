const Visit = require('./visitModel.js');

module.exports = {
  //post visit using userId and name as key
  postVisit(req, res) {
    Visit.create(req.body, (err, result) => {
      if (err) return res.status(418).send('Error, did not go through');
      //if successful, returns specified object. Because I'm using mongoDB, 
      //I'm leveraging mongoDB's self-generated _id assigned to each doc as my visitId
      res.send( { visitId:result._id} );
    })
  }, 

  //expected values either req.visitId or ( req.userId && searchString );
  getVisit(req, res) {
    //obtains URL params
    let rawParams = req.url.slice(req.url.indexOf('?') + 1).split('&');
    //declare obj to store key-val of params
    let params = {};
    //iterate over rawParam array to extract key-val pairs and set it in params obj
    rawParams.map(rawParam => {
        let [key, val] = rawParam.split('=')
        params[key] = decodeURIComponent(val)
    });

    //set up findObj. Check if visitId exisits. if it is use that to find in database.    
    let findObj = {};
    if (params.visitId) {
      findObj._id = params.visitId;
      Visit.find(findObj, (err, result) => {
        if (err) res.status(418).send('error');
        res.send(result);
      });
    //otherwise use userId;
    } else {
      findObj.userId = params.userId;
      //query findObj in DB; 
      //sort by _id with -1 means sort => sorts results from newest to oldest based on embedded timestamp in _id
      Visit.find(findObj).sort({_id: -1}).exec((err, result) => {
        if (err) res.status(418).send("error");
        let mostMatched = {};
        //conduct query on the latest 5 checkIns(locations) of userId;
        result.slice(0, 5).forEach(eachCheckIn => {
          //determine if searchString is longer or shorter
          let longStr; 
          let shortStr;
          //assign longStr and short 
          if (params.searchString.length > eachCheckIn.name.length) {
            longStr = params.searchString;
            shortStr = eachCheckIn.name;
          } else {
            longStr = eachCheckIn.name;
            shortStr = params.searchString;
          }
          //shortStr will be checked in longStr for a match (CASE INSENSITIVE); if there is set userId, name, and _id to 
          // object with key-val. values from eachCheckIn object
          if (longStr.toLowerCase().indexOf(shortStr.toLowerCase()) > -1) {
            mostMatched.userId = eachCheckIn.userId;
            mostMatched.name = eachCheckIn.name;
            mostMatched.visitId = eachCheckIn._id;
            //return array containing object with matched info;
            return res.send([mostMatched]);
          }
        })
        //otherwise, return empty array with no match;
        res.send([]);
      });
    }
  }
}