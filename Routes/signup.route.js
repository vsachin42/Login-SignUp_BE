const express = require("express");
const { userModel } = require("../Models/login.model");
const bcrypt = require("bcrypt");

const signUpRouter = express.Router();

signUpRouter.post("/", async (req, res) => {
  try {
    const { name, mail, password } = req.body;
    const existingUser = await userModel.findOne({ mail });
    if (existingUser) {
      res.status(400).json({ msg: "User already exists, Please Login!!" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(404).json({ error: err });
        } else {
          const user = new userModel({ name, mail, password: hash });
          await user.save();
          res
            .status(201)
            .json({ msg: "User successfully created", user: req.body });
        }
      });
    }
  } catch (error) {
    res.status(404).json({ msg: "Something went wrong", error });
  }
});

module.exports = {
  signUpRouter,
};
