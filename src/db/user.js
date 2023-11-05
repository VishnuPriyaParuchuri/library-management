const User = require('../db/model/user');

let getUserDetails = async() =>
{
  return await User.query().select(); 
}

let createUser = async(data) =>
{
  return await User.query().insert(data);
}

// let getUserByEmail = async (email, password) =>
// {
//     return await User.query().select().where({ email: email, password: password }).first();
// }




let updateUser = async(data, id) =>
{
  return await User.query().patchAndFetchById(data, id);
}

let deleteUserData = async(id) =>
{
  return await User.query().delete().where('id', id);
}

module.exports = {
    getUserDetails : getUserDetails,
    createUser : createUser,
    getUserByEmail :  getUserByEmail,
    updateUser : updateUser,
    deleteUserData : deleteUserData
}
