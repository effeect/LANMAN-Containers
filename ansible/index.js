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

app.listen(4000, "0.0.0.0", () => console.log("Backend running on port 4000"));
