  var mongoose = require("mongoose");
  var Schema = mongoose.Schema;

const AuthSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Поле Email обязательно"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Поле Password обязательно"],
    min: [10, "Поле Password должно содержать минимум 6 символов"],
  },
  passwordd: {
    type: String,
    trim: true,
    required: [true, "Поле Password обязательно"],
    min: [10, "Поле Password должно содержать минимум 6 символов"],
  },
});

module.exports = mongoose.model("Auth", AuthSchema);
