# publicApi

**Application that demonstrates a publicly accessible API endpoint to store userId (name of user) and name (of location)**

## Documentation: ##

 ## ***1. POST /visit***
     a. Accepts POST requests with ‘application/json’ types
     b. The schema for submitted objects is as follows: 
     
        {
          userId - the user that is submitting the location (string)
          name - the name of the location (string)  
        }
    
  ***Returns a visitId which can be referenced in the GET. Visit IDs are globally unique to the location submission***
  
 ## ***2. GET /visit***
     a. Can be queried with either of the following patterns:
        i. visitId (string)
        ii. Both of the following two query params: 
               1. userId (string)
               2. searchString- A string which is attempted to be matched over the 5 most recent locations the user has visited.
   
   ***Returns an array of object (one among five most recent submissions to POST with same nameId) that has a name (location) closely matches searchString. If no match, returns empty array***

