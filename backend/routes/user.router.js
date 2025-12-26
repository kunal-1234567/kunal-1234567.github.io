const express = require('express')
const Router = express.Router();
const {register} = require('../controllers/u.js')



Router.post('/register',register);
Router.get('/login',(req,res)=>{
    res.send("User route working");
});

module.exports = Router;