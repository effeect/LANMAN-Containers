export async function run(app) {
  app.get("/api/example-googles", (req, res) => {
    exec(
      "ansible-playbook playbooks/examples/ping-google.yml",
      (err, stdout, stderr) => {
        if (err) return res.status(500).send(stderr);
        res.send(stdout);
      }
    );
  });
}
