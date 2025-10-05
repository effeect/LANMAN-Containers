// Ping check for system
// This one is responsible for running the get/post/delete requests for the machines API
import ping from "ping";
import exec from "child_process";

export async function run(app, Machine) {
  app.post("/api/v2/jobs/ping", async (req, res) => {
    const { id } = req.body;
    try {
      const machine = await Machine.findById(id);
      // If the machine nor the ip address exist, fail it outright
      if (!machine || !machine.ip_address) {
        return res
          .status(404)
          .json({ error: "Machine or IP address not found" });
      }

      const result = await ping.promise.probe(machine.ip_address, {
        timeout: 5,
        extra: ["-c", "2"], // optional: send 2 packets
      });

      res.json({
        ip: machine.ip_address,
        alive: result.alive,
        time: result.time,
        output: result.output,
      });
    } catch (err) {
      console.error("Ping error:", err);
      res.status(500).json({ error: "Failed to ping machine" });
    }
  });
}
