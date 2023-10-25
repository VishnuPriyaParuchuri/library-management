const { Model } = require('objection');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
function getUniqueId()
{
    return uuidv4().split('-').join('').toUpperCase();
}

module.exports = {
   getUniqueId : getUniqueId
}