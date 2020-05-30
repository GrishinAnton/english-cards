const jwt = require("jsonwebtoken")
require("dotenv").config();

const createToken = (email, options) => {
    return jwt.sign(email, process.env.SECRET, options);
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET);
}

module.exports = { createToken, verifyToken }