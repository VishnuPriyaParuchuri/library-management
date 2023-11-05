let Book = require('./model/bookDetails');

let getBookDetails = async() =>
{
  return await Book.query().select();
}

module.exports = {
    getBookDetails : getBookDetails
}