import axios from "axios";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}`;

export const getMachines = async () => {
  const res = await fetch(`${API_BASE}/machines`); // Adjust port if needed
  if (!res.ok) throw new Error("Failed to fetch machines");
  return res.json();
};

export const getMachineById = async (id: string) => {
  const res = await axios.get(`${API_BASE}/machines/${id}`);
  return res.data;
};

export const addMachine = async (data: {
  username: string;
  password: string;
}) => {
  await axios.post(`${API_BASE}/machines`, data);
};
