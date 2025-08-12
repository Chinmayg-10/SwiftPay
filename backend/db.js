const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
mongoose.connect(process.env.DBUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  }
});
const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, //reference to User model
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    next();
  } catch (err) {
    next(err);
  }
});
const Account=mongoose.model("Account",accountSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  Account
};
