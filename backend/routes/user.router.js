const express = require('express')
const Router = express.Router();
const {register} = require('../controllers/u.js')



Router.post('/register',register);


module.exports = Router;