/*
  All in one file to handle MongoDB management and Ansible based API calls
*/
require("dotenv").config();
console.log(process.env.MONGO_INITDB_ROOT_USERNAME);
console.log(process.env.MONGO_INITDB_ROOT_PASSWORD);

const express = require("express");
const { exec } = require("child_process");
const app = express();
const mongoose = require("mongoose");
const ping = require("ping");
// Our App Routes
const example_google = require("./app_routes/ping-google");
const handle_machines = require("./app_routes/handle-machines");
const ping_machines = require("./app_routes/ping-machine");
const ansible_commands = require("./app_routes/run-ansible-job");

// CORS is required to do this
const cors = require("cors");
app.use(cors());
// Below may need to be removed
app.use(express.json());

const mongoURI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017/machinesdb?authSource=admin`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

//Below is to handle the machine request :
const Machine = require("./models/Machine");

// Running the App stuff from here, keeps version control a bit tidier for this work
handle_machines.run(app, Machine);
ping_machines.run(app, Machine);
ansible_commands.run(app, Machine);

// Used for Debugging
example_google.run(app, Machine);

app.get("/api/open-notepad", (req, res) => {
  exec(
    "ansible-playbook -i inventory/hosts.yml playbooks/windows/open-notepad.yml",
    (err, stdout, stderr) => {
      if (err) return res.status(500).send(stderr);
      res.send(stdout);
      res.send("hello");
    }
  );
});

app.get("/run-playbook", (req, res) => {
  exec(
    "ansible-playbook -i inventory/hosts.ini playbooks/ping.yml",
    (err, stdout, stderr) => {
      if (err) return res.status(500).send(stderr);
      res.send(stdout);
    }
  );
});

app.listen(4000, "0.0.0.0", () => console.log("Backend running on port 4000"));
