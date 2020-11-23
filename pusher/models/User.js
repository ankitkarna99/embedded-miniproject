const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: "Email is required",
  },
  password: {
    type: String,
    required: "Password is required",
  },
  randomCode: String,
});

module.exports = mongoose.model("User", userSchema);
