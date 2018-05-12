# publicApi

**Public API endpoint to store userId (name of user) and name (of place)**

##**Documentation:**

 ## ***1. POST /visit***
     ***a. Accepts POST requests with ‘application/json’ types***
     ***b. The schema for submitted objects is as follows:***
     ***c. userId - the user that is submitting the location***
     ***d. name - the name of the location   
     
  ***Returns a visitId which can be referenced in the GET. Visit IDs are globally unique to the location submission***
  
 ## ***2. GET /visit***
      ***a. Can be queried with either of the following patterns:***
        ***i. visitId*** 
        ***ii. Both of the following two query params:*** 
               ***1. userId***
               ***2. searchString- A string which is attempted to be matched over the 5 most recent locations the user has visited. The matching should be fuzzy, and case insensitive***
   
   ***Returns an array of arrival objects that was submitted to the POST***
