// The big one
import { spawn } from "child_process";
import { getMachineCredentials } from "./vault-handler";

export async function run(app, Machine) {
  app.post("/api/v2/ansible", async (req, res) => {
    const { machineId, job } = req.body;

    if (!machineId) {
      return res.status(400).send("Missing machineId");
    }
    if (!job) {
      return res.status(400).send("Missing Job Description");
    }
    const machine = await Machine.findById(machineId);
    // Use the machine vault path to fetch the username/password for the job at hand :
    const creds = await getMachineCredentials(machine.name);
    console.log(creds);
    // Run the playbook below :
    const playbook = spawn("ansible-playbook", [
      `playbooks/${job}.yml`,
      "-i",
      `${machine.ip_address},`,
      "-e",
      `username=${creds.username} password=${creds.password}`,
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
