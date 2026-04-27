const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

// Pre-save hook to hash password before saving to database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Modal
const User = mongoose.model("User" , userSchema);

module.exports = User