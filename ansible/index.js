const express = require("express");
const { exec } = require("child_process");
const app = express();

// CORS is required to do this
const cors = require("cors");
app.use(cors());

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
