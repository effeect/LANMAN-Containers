import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMachineById } from "../lib/api";
import { Machine } from "../../types/machine";

export default function MachinePage() {
  const { query } = useRouter();
  const [machine, setMachine] = useState<Machine | null>(null);

  useEffect(() => {
    if (query.id) {
      getMachineById(query.id as string).then(setMachine);
    }
  }, [query.id]);

  if (!machine) return <p>Loading...</p>;

  return (
    <div>
      <h1>{machine.name}</h1>
      <p>Username: {machine.username}</p>
      <p>Password: {machine.password}</p>
    </div>
  );
}
