const express = require("express");
const app = express();
const port = 8080;
var mongoose = require("mongoose");
const bcrypt = require("bcrypt")
require("dotenv").config();


mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds351807.mlab.com:51807/english-cards`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("connected"));

const Auth = require("./models/Auth")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
  console.log(req.body, 'body');
  const request = new Auth(req.body);
  request
    .save()
    .then((result) => {
      console.log(result, "result");
      res.status(200).json({
        status: 200,
        message: "Вы успешно зарегестрированы",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(422).json({
        status: 422,
        error: err,
      });
    });
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const user = await Auth.findOne({ email: req.body.email })
  console.log(user);
  if (!user) {
      res.status(422).json({
        status: 422,
        error: "Email не найден",
      });
    }
  const isValidPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPassword) {
    res.status(422).json({
      status: 422,
      error: "Пароль указан неверно",
    });
  }
  
  res.status(200).json({
    status: 200,
    user,
  });
  
  
});

app.listen(port, () => console.log(`Start:${port}`));
