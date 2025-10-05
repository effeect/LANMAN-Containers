const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  ip_address: String,
  date: String,
});

module.exports = mongoose.model("Machine", machineSchema);
