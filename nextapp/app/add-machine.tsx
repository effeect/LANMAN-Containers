import { useState } from "react";
import { addMachine } from "./lib/api";
import { useRouter } from "next/router";

export default function AddMachinePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMachine({ username, password });
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Machine</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}
