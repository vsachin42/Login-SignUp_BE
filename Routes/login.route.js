const express = require("express");
const { userModel } = require("../Models/login.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await userModel.findOne({ mail });
    if (!user) {
      res.status(404).json({ msg: "User not exits, Please SignUP" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(404).json({ msg: "Wrong Credentials!!" });
        } else {
          const token = jwt.sign({ name: user.name }, process.env.SecretKey);
          res.status(200).json({ msg: "Login Successful!!", token });
        }
      });
    }
  } catch (err) {
    res.status(404).json({ msg: "Something went wrong", error: err });
  }
});

module.exports = {
  loginRouter,
};
