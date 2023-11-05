const { Model } = require('objection');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
function getUniqueId()
{
    return uuidv4().split('-').join('').toUpperCase();
}


var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isEmailValid(email) 
{
    if (!email)
    {
        return false;
    }

    if (email.length > 254)
    {
        return false;
    }

    let valid = emailRegex.test(email);

    if (!valid)
    {
        return false;
    }
    // Further checking of some things regex can't handle
    let parts = email.split("@");

    if (parts[0].length > 64)
    {
        return false;
    }
    
    let domainParts = parts[1].split(".");

    if (domainParts.some(function (part) { return part.length > 63; }))
    {
        return false;
    }

    return email;
}

function createRandomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 8) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function getTime()  {

    return new Date().toLocaleTimeString('en-IN', { hour12: false, 
        hour: "numeric", 
        minute: "numeric"});

 
}

module.exports = {
   getUniqueId : getUniqueId,
   isEmailValid : isEmailValid,
    createRandomString: createRandomString,
    getTime : getTime
}

