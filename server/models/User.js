const mongoose = require("mongoose");

const UserSchema = new.mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  sex: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
