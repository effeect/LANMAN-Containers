"use client";
// NEEDS A LOT OF WORK
import { useState } from "react";

export async function runCommand(
  endpoint: string,
  onLine: (line: string) => void
) {
  console.log("Running command for the following endpoint", endpoint);

  //Will stream the console output
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`);
    const reader = res.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (!reader) {
      throw new Error("No response body");
    }

    // Empty String
    let partial = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      partial += decoder.decode(value, { stream: true });
      const lines = partial.split("\n");
      partial = lines.pop() || ""; // keep incomplete line

      for (const line of lines) {
        onLine(line);
      }
    }

    if (partial) {
      onLine(partial); // flush last line
    }
  } catch (error) {
    console.error("Error running command:", error);
    onLine("Failed to run command.");
  }
}

// export async function runCommand(endpoint: String) {
//   let isRunning = false;
//   console.log("Running command for:", endpoint);
//   if (isRunning) {
//     console.warn("Command already running. Please wait.");
//     return;
//   }

//   isRunning = true;
//   console.log("Running command:", endpoint);
//   console.log(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`);
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`);
//     const text = await res.text();
//     alert(text);
//   } catch (error) {
//     console.error("Error running command:", error);
//     alert("Failed to run command.");
//   } finally {
//     isRunning = false;
//   }
// }

export default function CommandButton({
  name,
  endpoint,
}: {
  name: string;
  endpoint: string;
}) {
  const [output, setOutput] = useState<string[]>([]);

  const handleRun = () => {
    setOutput([]); // clear previous output
    runCommand(endpoint, (line) => {
      setOutput((prev) => [...prev, line]);
    });
  };

  return (
    <div className="my-4">
      <button
        onClick={handleRun}
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        {name}
      </button>

      <pre className="mt-4 p-4 bg-black text-green-300 rounded max-h-96 overflow-y-auto whitespace-pre-wrap">
        {output.join("\n")}
      </pre>
    </div>
  );
}
