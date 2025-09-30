"use client"

export default function runCommand() {
  const runPlaybook = async () => {
    const res = await fetch('http://127.0.0.1:4000/example-google/');
    console.log("hello world")
    const text = await res.text();
    console.log(text)
    alert(text);
  };

  return <button onClick={runPlaybook}>Run Ansible Playbook</button>;
}