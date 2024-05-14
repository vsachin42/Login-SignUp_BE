const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  mail: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
});

const userModel = mongoose.model("users", loginSchema);

module.exports = {
  userModel,
};
