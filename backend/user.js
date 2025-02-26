require('dotenv').config();
const express = require('express')
const zod = require('zod')
const User = require('./database/db.js');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require('cookies');


const signupBody = zod.object({
        username:zod.string().email(),
        password:zod.string(),
        firstName:zod.string(),
        lastName:zod.string(),
        
})
router.post('/signup' , async (req,res) => {
    const { success } = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs",
          });
    }
    const existingUser = await User.findOne({
        username: req.body.email,
    })
  
    if (existingUser) {
        return res.status(411).json({
          message: "Email already taken",
        });
      }
     
    const { username,password,firstName, lastName } = req.body;
  
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hashSync(password, salt);
   
    const newUser = await User.create({
        username,
        password:hashedPassword,
        firstName,
        lastName,
    });
    const userId = newUser._id;
    const token = jwt.sign(
        {
          userId,
        },
        process.env.JWT_SECRET
      );
    res.cookie("token",token);
    res.status(200).json({
        message: "User created successfully",
        token: token,
      });
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})
router.post("/signin", async (req, res) => {
  try {
      const { success } = signinBody.safeParse(req.body);
      if (!success) {
          return res.status(400).json({ message: "Incorrect inputs" });
      }

    
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(404).json({ message: "User not found!" });
      }

     
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
          return res.status(401).json({ message: "Wrong credentials!" });
      }

      
     // const token = req.cookies.token;  

      // if (!token) {
      //     return res.status(401).json({ message: "Token not found. Please login again." });
      // }

     
     // const decodedMes = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token:", decodedMes);
     const userId = user._id;
     const token = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET
     );
    res.cookie("token",token);
    
      res.status(200).json({
          message: "Sign-in successful",
          token: token, 
          firstName: user.firstName
      });
  } catch (error) {
      console.error("Sign-in error:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;