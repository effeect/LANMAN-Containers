"use client";
// NEEDS A LOT OF WORK
import { useState, useEffect, useRef } from "react";
import { runAnsibleJob } from "../../../lib/api";

export default function CommandButton({
  name,
  endpoint,
  machine_id,
  job,
}: {
  name: string;
  endpoint: string;
  machine_id?: string;
  job?: string;
}) {
  const [output, setOutput] = useState<string[]>([]);
  const outputRef = useRef<HTMLPreElement>(null);
  const handleRun = () => {
    setOutput([]);
    runAnsibleJob(machine_id!, job!, (line) => {
      setOutput((prev) => [...prev, line]);
    });
  };

  // Auto-scroll to bottom when output updates
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="my-4">
      <button
        onClick={handleRun}
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        {name}
      </button>

      <pre
        ref={outputRef}
        className="mt-4 p-4 bg-black text-green-300 rounded max-h-96 overflow-y-auto whitespace-pre-wrap"
      >
        {output.join("\n")}
      </pre>
    </div>
  );
}
