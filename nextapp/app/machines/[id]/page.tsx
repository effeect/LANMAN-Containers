// app/machines/[id]/page.tsx
import { notFound } from "next/navigation";
import { getMachineById } from "@/lib/api";
import PingStatus from "./functions/ping";
import CommandButton from "./functions/ansible_jobs";

export default async function MachinePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const machine = await getMachineById(id);
  if (!machine) return notFound();

  return (
    <div className="mx-auto p-6 bg-white shadow">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Machine : {machine.name}
      </h1>
      <p className=" text-black ">Username : {machine.username}</p>
      <p className=" text-black ">IP Address : {machine.ip_address}</p>
      <p className=" text-black ">ID : {machine._id}</p>
      <p className=" text-black ">Created At : {machine.date}</p>
      <PingStatus id={machine._id} />
      <CommandButton
        name="Run a ping check to google"
        endpoint="v2/ping-google"
        machine_id={machine._id}
        job="windows/open-notepad"
      />
      <CommandButton
        name="Run a Ansible Job with vars"
        endpoint="String"
        machine_id={machine._id}
        job="windows/open-notepad"
      ></CommandButton>
    </div>
  );
}
