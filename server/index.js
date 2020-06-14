const express = require("express");
const app = express();
const port = 8080;
var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require('multer')
const R = require('ramda')
var upload = multer({
  dest: './uploads/'});
//Валидация пока для примера
// const { check, validationResult } = require("express-validator");
require("dotenv").config();

const User = require("./models/User")
const { handleError, ErrorHandler } = require("./utils/ErrorHandler")
const { createToken, verifyToken } = require("./utils/Token")

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/uploads'));

app.post(
  "/register",
  async (req, res, next) => {
    console.log(req.body, "body");
    try {
      const user = new User(req.body);
      const userDb = await user.save()
      console.log(userDb, "userDb");
      if(userDb){
        res.status(200).json({
          status: "OK",
          statusCode: 200,
          message: "Вы успешно зарегестрированы",
        });
      }

    } catch (err) {
      console.log(err);
      next(new ErrorHandler(422, err))
    }
  }
);

app.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      next(new ErrorHandler(422, "Email не найден"))
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
      next(new ErrorHandler(422, "Пароль указан неверно"))
    }

    const token = createToken({ email: user.email}, { expiresIn: "1hr" })

    res.status(200).json({
      status: "OK",
      statusCode: 200,
      token,
    });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(422, err))
  }
  
});

app.get(
  "/profile",
  async (req, res, next) => {
    console.log(req.body);
    console.log(req.headers);
    try {
      const token = req.headers["authorization"];

      if (token){
        const { email } = verifyToken(token)
     
        const user = await User.findOne({ email: email })

        if (!user) {
          next(new ErrorHandler(401, "Пользователь не найден"))
        }

        res.status(200).json({
          status: "OK",
          statusCode: 200,
          user: {
            name: user.name,
            surname: user.surname,
            sex: user.sex,
            city: user.city,
            email: user.email,
            avatar: user.avatar,
            bithday: user.bithday
          }
        });
      } else {
        next(new ErrorHandler(401, "Вы не авторизованы"))
      }
    } catch (err) {
      console.log(err);
      next(new ErrorHandler(401, "Невалидный ключ авторизации"))
    }
  }
);

app.post(
  "/profile",
  upload.single('avatar'),
  async (req, res, next) => {
    console.log(req.body);
    console.log(req.headers);
    console.log(req.file, 'reqFile');
    /**
      fieldname: 'avatar',
      originalname: 'default-profile-picture-circle-hd-png-download.png',
      encoding: '7bit',
      mimetype: 'image/png',
      destination: './uploads/',
      filename: '4eba98c4a4205bd4962e8447ab0e3766',
      path: 'uploads/4eba98c4a4205bd4962e8447ab0e3766',
      size: 38366
     */
    try {
      const token = req.headers["authorization"];
      let body = null

      if (token) {
        const { email } = verifyToken(token)

        if (req.file) {
          body =  R.omit(['email', 'password'], req.body);
          body.avatar =  `${req.file.path}.${req.file.mimetype.match(/\/.+/g)[0].substr(1)}`
        } else {
          body = R.omit(['email', 'password'], req.body);
        }

        const user = await User.findOneAndUpdate({ email: email }, { ...body }, {
          new: true,
          runValidators: true,
        })
        console.log(user, 'USER');
        
        if (!user) {
          next(new ErrorHandler(401, "Пользователь не найден"))
        }

        res.status(200).json({
          status: "OK",
          statusCode: 200,
          user: {
            name: user.name,
            surname: user.surname,
            sex: user.sex,
            city: user.city,
            email: user.email,
            avatar: user.avatar,
            bithday: user.bithday
          }
        });
      } else {
        next(new ErrorHandler(401, "Вы не авторизованы"))
      }
    } catch (err) {
      console.log(err);
      next(new ErrorHandler(400, err))
    }
  }
);

app.use((err, req, res, next) => {
  console.log(err, 'err');
  handleError(err, res)
})

app.listen(port, () => console.log(`Start:${port}`));
