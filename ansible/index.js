const express = require('express');
const { exec } = require('child_process');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/run-playbook', (req, res) => {
  exec('ansible-playbook -i inventory/hosts.ini playbooks/ping.yml', (err, stdout, stderr) => {
    if (err) return res.status(500).send(stderr);
    res.send(stdout);
  });
});

app.listen(4000, () => console.log('Backend running on port 4000'));