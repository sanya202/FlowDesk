const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,//use cannot exist without fulName
      trim: true, //makes the database cleaner
    },

    email: {
      type: String,
      required: true,
      unique: true, //two users should not have same email
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    avatar: {
      type: String, //url string for user avatar
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema); //model is what actually talks to mongodb