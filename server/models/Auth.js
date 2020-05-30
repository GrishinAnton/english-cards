  var mongoose = require("mongoose");
  var Schema = mongoose.Schema;

const AuthSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Поле Email обязательно"],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Пожалуйста укажите валидный Email',
    ],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Поле Password обязательно"],
    minlength: [6, "Поле Password должно содержать минимум 6 символов"],
  },
});

module.exports = mongoose.model("Auth", AuthSchema);
