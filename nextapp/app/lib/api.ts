import axios from "axios";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}`;

export const getMachines = async () => {
  console.log(`${API_BASE}/v2/machines`);
  const res = await fetch(`${API_BASE}/v2/machines`); // Adjust port if needed
  if (!res.ok) throw new Error("Failed to fetch machines");
  return res.json();
};

// Note that we are dealing with Mongo IDs
export const getMachineById = async (id: string) => {
  console.log(`${API_BASE}/v2/machines/${id}`);
  const res = await fetch(`http://ansible-runner:4000/api/v2/machines/${id}`);
  if (!res.ok) throw new Error("Failed to fetch machines");
  return res.json();
};

export const getMachinePingStatus = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/v2/jobs/ping`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      throw new Error(`Ping failed with status ${res.status}`);
    }

    const data = await res.json();

    return {
      ip: data.ip,
      alive: data.alive,
      time: data.time,
      output: data.output,
      status: data.alive ? "online" : "offline",
    };
  } catch (err: any) {
    console.error("Ping error:", err);
    return {
      ip: null,
      alive: false,
      time: null,
      output: null,
      status: "unreachable",
      error: err.message || "Unknown error",
    };
  }
};

// AddMachine expects 3 arguements, machine name, username and password
export const addMachine = async (data: {
  name: string;
  username: string;
  password: string;
  ip_address: string;
}) => {
  await axios.post(`${API_BASE}/v2/machines`, data);
};
