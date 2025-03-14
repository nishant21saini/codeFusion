require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./user');
const app = express();
const cors = require("cors");
const leetrouter = require('./leetcode')
const geekrouter = require('./gfg')
const chefrouter = require('./codeChef')
const leetEvent = require('./eventTracker/leetEvent')
const cookieParser = require('cookie-parser')
require('./database/db.js')



app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/event',leetEvent);
app.use('/authentication', mainRouter);
app.use('/leetcode',leetrouter);
app.use('/gfg',geekrouter);
app.use('/codechef',chefrouter);


const connectDB = async () => {
  try {
    console.log(process.env.MONGODB)
    await mongoose.connect(process.env.MONGODB);
    console.log('Database is connected successfully!');

  } catch (err) {
    console.error('Database connection error:', err);
    
  }
};

connectDB().then(()=>{
      app.listen(5009, () => {
        console.log('Server started on port 5009');
      })})
      .catch((err) =>{
         console.log("some error occured ")
         })




