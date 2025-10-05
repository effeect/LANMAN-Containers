"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMachines } from "./lib/api";
import { Machine } from "../types/machine";

export default function HomePage() {
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    getMachines().then(setMachines);
  }, []);

  return (
    <div>
      <h1>Machines</h1>
      <ul>
        {machines.map((machine) => (
          <li key={machine._id}>
            <Link href={`/machines/${machine._id}`}>{machine.name}</Link>
          </li>
        ))}
      </ul>
      <Link href="/add-machine">Add New Machine</Link>
    </div>
  );
}
