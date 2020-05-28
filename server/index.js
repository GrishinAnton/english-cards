const express = require("express");
const app = express();
const port = 8080;
var mongoose = require("mongoose");
const bcrypt = require("bcrypt")
//Валидация пока для примера
// const { check, validationResult } = require("express-validator");
require("dotenv").config();

const User = require("./models/User")
const { handleError, ErrorHandler } = require("./utils/ErrorHandler")
const { createToken, verifyToken } = require("./utils/Token")

mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds351807.mlab.com:51807/english-cards`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post(
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
            email: user.email
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

app.use((err, req, res, next) => {
  console.log(err, 'err');
  handleError(err, res)
})

app.listen(port, () => console.log(`Start:${port}`));
