const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require('./routes/user.router.js')
// const bcrypt = require("bcrypt");
const connectDB= require('./db/db.js')


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users',Router);

connectDB();





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
