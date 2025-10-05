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
    <div className="mx-auto p-6 bg-white shadow">
      <h1 className="text-3xl font-bold mb-6 text-black">Machines</h1>
      <ul className="space-y-4 mb-6">
        {machines.map((machine) => (
          <li key={machine._id}>
            <Link
              href={`/machines/${machine._id}`}
              className="block px-4 py-2 bg-gray-100 text-black hover:bg-gray-200 rounded transition"
            >
              {machine.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/add-machine"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add New Machine
      </Link>
    </div>
  );
}
