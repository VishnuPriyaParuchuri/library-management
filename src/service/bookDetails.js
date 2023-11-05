const db = require('../db/bookDetails');
const config = require('../../config');
const common = require('../utils/utils');
const Authentication = require('../service/authentication');
const fs = require('fs');
const path = require('path');


let bookDetails = async() =>
{
  try 
  {
    let bookData = await db.getBookDetails();

    if(bookData. length == 0)
    {
      return {
        status : 0,
        message : 'book details not found'
      }
    }

    return{
      status : 1,
      bookData : bookData
    }
  }
  catch (error)
  {
    return{
      status : 0,
      message : error.message
    }
  }
}


module.exports = {
  bookDetails : bookDetails
}
