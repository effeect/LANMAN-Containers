"use client";
import { IsClientSide } from "is-client-side";

export default function runCommand() {
  const runPlaybook = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/example-googles`
    );
    console.log("hello world");
    // Whilst we await for the response

    //=============
    const text = await res.text();
    console.log(text);
    alert(text);
  };

  return <button onClick={runPlaybook}>Run Ansible Playbook</button>;
}
