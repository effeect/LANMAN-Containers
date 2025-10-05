// app/machines/[id]/page.tsx
import { notFound } from "next/navigation";
import { getMachineById } from "../../lib/api";

export default async function MachinePage({
  params,
}: {
  params: { id: string };
}) {
  const machine = await getMachineById(params.id);
  if (!machine) return notFound();

  return (
    <div>
      <h1>{machine.name}</h1>
      <p>Username: {machine.username}</p>
      <p>Password: {machine.password}</p>
    </div>
  );
}
