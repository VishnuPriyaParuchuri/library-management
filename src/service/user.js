const db = require('../db/user');
const config = require('../../config');
const common = require('../utils/utils');
const Authentication = require('../service/authentication');
const fs = require('fs');
const path = require('path');
const smtp = require('./smtp');
const html = require('../utils/htmlTemplates')


let userDetails = async() =>
{
  try{
     
    let user = await db.getUserDetails();

    if (user.length == 0) 
    {
      return {
        status : 0,
        message : "user details not found"
      }
    }

    return{
      status : 1,
      data : {
       user : user
       }
    };

   }
   catch(error)
   {

      return {
        status : 0,
        message : 'there is an error'
      } 
   }
}

let createUser = async (reqParams) => 
{
  try 
  {

    let uuid = common.getUniqueId();

    let email = common.isEmailValid(reqParams.email);

    if (!email) 
    {
      return {
        status : 0,
        message :"incorrect email address."
      }
    }


    let params = {
      name: reqParams.name,
      email: email,
      role: reqParams.role,
      uuid: uuid,
      otp : otp,
      otpTime : time,
      createdAt: new Date(),
      createdBy: uuid
    }

    if ((reqParams.role == 'staff')) 
    {
      params.role = JSON.stringify(["STAFF"])
    }
    else if ((reqParams.role == 'student')) 
    {
      params.role = JSON.stringify(["STUD"])
    }

    let user = await db.createUser(params);

    return {
      status: 1,
      data : {
        user : user
      }
    }

  }
  catch (error) 
  {

    console.log('error', error);
    return {
      status : 0,
      message :'there is an error'
    }
  }
}


const sendEmail = async (reqParams) =>
{
    try
    {
        let email = reqParams.email;
       
        let userDetails = await db.getUserByEmail(email);

        if (!userDetails)
        {
            return {
                status:0,
                message: "User details incorrect."
            };
        }
       
    let otp = common.createRandomString();

    let time = common.getTime();

    let params = {
       otp : otp,
       otpTime : time
    }

    let updateUser = await db.updateUser(params, userDetails.id);

    let htmlData = {
      name: userDetails.name,
      otp : otp
    }

    let emailSubject = `Library Application One-Time password`;
    let emailBody = html.generateOTP(htmlData); 

    let emailParams ={
      email: user.email,
      subject: emailSubject,
      message: emailBody,
    }

    let x = await smtp.sendEmail(emailParams);
    console.log('21', x)


        return {
            status: 1,
            data : {
             updateUser : updateUser
            }
        };
    }
    catch (error)
    {

        return {
            status : 0,
            message : error.message
        };
    }
};

const verifyOTP = async(reqParams) =>
{
   try{
    let user = await db.getUserByEmail(email, otp);


    if(!user.otp == reqParams.otp)
    {
      return {
        status : 0,
        message : 'Incorrect OTP try again'
      }
    }

    let time = common.getTime();

    let actualTime = new Date();

  }catch(error)
  {
    return {
      status : 0,
      message : error.message
    }
  }
}

let updateUser = async(reqParams) =>
{
  try{
     let id = reqParams.id ? reqParams.id : null;

     if(!id)
     {
        return {
        status : 0,
        message : 'user id not found'
        }
     }

    let params = {
       updatedAt : new Date()
     }

     if(reqParams.name)
     {
       params.name = reqParams.name
     }

     let updateUser = await db.updateUser(id, params);

     return updateUser;
   }
   catch(error)
   {
     return {
         status : 0,
         message : error.message
       }
   }
}

let deleteUser = async(reqParams) =>
{
  try
  {
    let user = await db.deleteUserData(reqParams.id);

    return {
      status : 1,
      message : 'User details deleted successfully'
    }
  }
  catch(error)
  {
    return {
      status : 0,
      message : error.message
    }
  }
}


module.exports = {
   userDetails : userDetails,
   createUser : createUser,
   sendEmail : sendEmail,
   updateUser : updateUser,
   deleteUser : deleteUser
}