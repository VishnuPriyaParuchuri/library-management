const db = require('../db/user');
const config = require('../../config');


let userDetails = async() =>
{
  try{
     
    let user = await db.getUserDetails();

    if (user.length == 0) 
    {
      return "user details not found";
    }

    return user;
   }
   catch(error)
   {
     console.log(error);
      return  'there is an error';
   }
}

// let createUser = async() =>
// {
//   try{
//      let user = await db.getUserDetails();
    
//      if(role == 'librarian')
//      {
//        return 'LIBR'
//       }
      
      
//    }
//    catch(error)
//    {
//      return 'there is an error'
//    }
// }

module.exports = {
   userDetails : userDetails
}