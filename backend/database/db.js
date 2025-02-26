 const mongoose = require("mongoose")
// mongoose.connect('mongodb+srv://nishant_21:nishant_21@cluster0.kpmqyrr.mongodb.net/').then(() => console.log("connected successfully"));

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 30,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
  });
  //mongoose.model() create a model based on given schema 
  //User is representing the name of collection
  // userSchema defines the structureof document in that collection 

  const User = mongoose.model('User', userSchema);
  module.exports = User;