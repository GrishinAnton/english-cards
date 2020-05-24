const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});
app.post("/login", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen(port, () => console.log(`Start:${port}`));
