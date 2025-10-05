"use client";
import { IsClientSide } from "is-client-side";

// Needs to be looked at a little closer
export async function runCommand(endpoint: String) {
  let isRunning = false;
  console.log("Running command for:", endpoint);
  if (isRunning) {
    console.warn("Command already running. Please wait.");
    return;
  }

  isRunning = true;
  console.log("Running command:", endpoint);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`);
    const text = await res.text();
    alert(text);
  } catch (error) {
    console.error("Error running command:", error);
    alert("Failed to run command.");
  } finally {
    isRunning = false;
  }
}

export default function CommandPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => runCommand("example-googles")}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Google Ping Check playbook
        </button>
        <button
          onClick={() => runCommand("open-notepad")}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Windows Open Notepad
        </button>
        <button className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
          Button 3
        </button>
        <button className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">
          Button 4
        </button>
      </div>
    </div>
  );
}
