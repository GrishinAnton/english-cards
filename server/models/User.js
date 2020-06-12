const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
const SALT_WORK_FACTOR = 8;

const enumSex = ['male', 'female']

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  surname: {
    type: String,
    trim: true,
  },
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
  sex: {
    type: String,
    enum: enumSex,
    validate: {
      validator: function (arg) {
        return enumSex.includes(arg)
      },
      message:'Пол, указан неверно'
    }
  },
  avatar: {
    type: String,
  },
  city: {
    type: String,
    trim: true
  },
  bithday: {
    type: String
  }
});

UserSchema.pre("save", function (next) {
  this.avatar = `assets/default-profile-picture.png`;
  next();
});

UserSchema.pre("save", function (next) {

  if (!this.isModified("password")) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  });
})

module.exports = mongoose.model("User", UserSchema);
