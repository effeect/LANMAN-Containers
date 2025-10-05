// Handle Machines
// This one is responsible for running the get/post/delete requests for the machines API
export async function run(app, Machine) {
  // Post Request : Add machines
  app.post("/api/v2/machines", async (req, res) => {
    const { name, username, password, ip_address } = req.body;
    console.log(ip_address);
    if (!name || !username || !password || !ip_address) {
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

    // Below is a check to evaluate that there isn't an IP conflict
    const existing_ip = await Machine.findOne({ ip_address });
    if (existing_ip) {
      return res.status(409).json({
        error: "Machine Name Conflict. Please refer to Documentation",
      });
    }
    // Adding a creation date done server side
    const created_on = new Date().toISOString();
    const machine = new Machine({
      name,
      username,
      password,
      ip_address,
      created_on,
    });

    try {
      const savedMachine = await machine.save();
      res.status(201).json(savedMachine);
    } catch (err) {
      res.status(500).json({ error: "Failed to save machine" });
    }
  });

  // GET request : Get Machine
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
}
