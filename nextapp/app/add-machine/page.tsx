"use client";

import { useState } from "react";
import { addMachine } from "../lib/api";

export default function AddMachinePage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      await addMachine({ name, username, password });
      setStatus("success");
      setName("");
      setUsername("");
      setPassword("");
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Failed to add machine");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Machine</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Machine Name"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Windows Username"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Windows Password"
          required
          type="password"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
        />
        {status === "error" && <p className="text-red-600">{error}</p>}
        {status === "success" && (
          <p className="text-green-600">Machine added successfully!</p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {status === "loading" ? "Adding..." : "Add Machine"}
        </button>
      </form>
    </div>
  );
}
