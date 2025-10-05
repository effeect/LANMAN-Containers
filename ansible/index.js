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

// Handle Machine Requests
app.post("/api/v2/machines", async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({
      error: "Machine name, Windows username, and password are required.",
    });
  }

  // Below is a check to evaluate that the machine name is not a conflict
  const existing = await Machine.findOne({ name });
  if (existing) {
    return res.status(409).json({
      error: "Machine Name Conflict. Please refer to Documentation",
    });
  }

  const machine = new Machine({
    name,
    username,
    password,
  });

  try {
    const savedMachine = await machine.save();
    res.status(201).json(savedMachine);
  } catch (err) {
    res.status(500).json({ error: "Failed to save machine" });
  }
});

app.get("/api/v2/machines", async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch machines" });
  }
});

app.delete("/api/v2/machines/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Machine.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Machine not found" });
    }
    res
      .status(200)
      .json({ message: "Machine deleted successfully", machine: deleted });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete machine" });
  }
});

app.get("/api/v2/machines/:id", async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (!machine) return res.status(404).json({ error: "Machine not found" });
    res.json(machine);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch machine" });
  }
});

//========================================================================
app.get("/api/example-googles", (req, res) => {
  exec(
    "ansible-playbook playbooks/examples/ping-google.yml",
    (err, stdout, stderr) => {
      if (err) return res.status(500).send(stderr);
      res.send(stdout);
    }
  );
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

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

app.get("/api/machines", (req, res) => {
  // Test Data for the API
  const machines = [
    {
      id: "1",
      name: "Machine Alpha",
      username: "alpha_user",
      password: "alpha_pass",
    },
    {
      id: "2",
      name: "Machine Beta",
      username: "beta_user",
      password: "beta_pass",
    },
  ];
  res.json(machines);
});

// POST endpoint to add a machine
app.post("/api/machines", (req, res) => {
  /* 
  POST /api/machines
Content-Type: application/json

{
  "username": "gamma_user",
  "password": "gamma_pass"
}
  */
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const newMachine = {
    id: uuidv4(),
    name: `Machine ${username}`,
    username,
    password,
  };

  machines.push(newMachine);
  res.status(201).json(newMachine);
});

app.listen(4000, "0.0.0.0", () => console.log("Backend running on port 4000"));
