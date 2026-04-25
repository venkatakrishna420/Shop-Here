const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture:{
      type : String , // url
       default: null // S3 key will be stored here
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

//Modal
const User = mongoose.model("User" , userSchema);

module.exports = User