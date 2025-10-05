const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
});

module.exports = mongoose.model("Machine", machineSchema);
