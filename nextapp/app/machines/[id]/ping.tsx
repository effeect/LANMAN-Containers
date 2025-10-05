"use client";

import { useEffect, useState } from "react";
import { getMachinePingStatus } from "../../lib/api";

export default function PingStatus({ id }: { id: string }) {
  const [ping, setPing] = useState(null);

  useEffect(() => {
    getMachinePingStatus(id).then(setPing);
  }, [id]);

  if (!ping) return <p className="text-gray-500">Checking status...</p>;

  return (
    <div className="mt-4">
      <p className="text-lg font-semibold">
        Status:{" "}
        <span
          className={`${
            ping.status === "online"
              ? "text-green-600"
              : ping.status === "offline"
              ? "text-red-600"
              : "text-gray-500"
          }`}
        >
          {ping.status}
        </span>
      </p>
      {ping.output && (
        <pre className="mt-2 p-2 bg-gray-100 text-sm text-gray-700 rounded whitespace-pre-wrap">
          {ping.output}
        </pre>
      )}
    </div>
  );
}
