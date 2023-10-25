const express = require('express');

let app = express();
const config = require ('../../config');
const bodyParser = require("body-parser");

let userService = require('../service/user');


app.get('/api/user/details', async(req, res) =>
 {
   return res.json(await userService.userDetails())
});

// app.post('/api/create/user', async(req,res) =>
// {
//    return res.json(await userService.createUser())
// });

module.exports = app;