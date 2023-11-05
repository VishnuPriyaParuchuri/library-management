
const { Model } = require("../db-config");
const guid = require('objection-guid')();
const tables = require('./tables');

class Book extends guid(Model)
{
    static get tableName()
    {
        return `${tables.book}`;
    } 
}

module.exports = Book;