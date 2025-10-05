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

// AddMachine expects 3 arguements, machine name, username and password
export const addMachine = async (data: {
  name: string;
  username: string;
  password: string;
}) => {
  await axios.post(`${API_BASE}/v2/machines`, data);
};
