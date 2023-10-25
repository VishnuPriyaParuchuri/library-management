const User = require('../db/model/user');

let getUserDetails = async() =>
{
  return await User.query().select('name'); 
}

module.exports = {
    getUserDetails : getUserDetails
}
