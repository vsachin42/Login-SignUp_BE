const express = require("express");
const { connection } = require("./db");
const cors = require("cors");
const { loginRouter } = require("./Routes/login.route");
const { signUpRouter } = require("./Routes/signup.route");
const { userModel } = require("./Models/login.model");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes

app.use("/login", loginRouter);
app.use("/signup", signUpRouter);

// Home URL

app.get("/", (req, res) => {
  try {
    res.status(200).json({
      message: "Welcome! It is a login, signup project by using nodejs",
    });
  } catch (err) {
    res.status(404).json({ message: "Something went wrong", err });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ err });
  }
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
    console.log(`Running at ${process.env.PORT} port`);
  } catch (err) {
    console.log(err);
  }
});
