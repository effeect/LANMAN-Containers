import { spawn } from "child_process";

// OLD EXEC version, make sure to import Spawn
// export async function run(app) {
//   app.get("/api/v2/ping-google", (req, res) => {
//     exec(
//       "ansible-playbook playbooks/examples/ping-google.yml",
//       (err, stdout, stderr) => {
//         if (err) return res.status(500).send(stderr);
//         res.send(stdout);
//       }
//     );
//   });
// }

export async function run(app) {
  app.get("/api/v2/ping-google", (req, res) => {
    const playbook = spawn("ansible-playbook", [
      "playbooks/examples/ping-google.yml",
    ]);

    res.setHeader("Content-Type", "text/plain");

    playbook.stdout.on("data", (data) => {
      res.write(data); // stream stdout to client
    });

    playbook.stderr.on("data", (data) => {
      res.write(data); // optionally stream stderr too
    });

    playbook.on("close", (code) => {
      res.end(`\nProcess exited with code ${code}`);
    });
  });
}
