const mongoose  = require('mongoose');
const User = require('../models/user.js')

const register =async(req , res)=>{
const  {name, email , password ,mobile,dob}  = req.body;

try {
    if(!name|| !email || !password || !mobile || !dob){
        return res.status(400).json({message : "All fields are required"})
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message : "Email already registered"})
    }

    const newUser = new User({name , email , password , mobile , dob});
    await newUser.save();
   res.status(201).json({
  message: "User registered successfully",
  user: newUser
});

} catch (error) {
    console.log(error);
    res.status(500).json({message : "Server error"})
}
}

module.exports = {register}