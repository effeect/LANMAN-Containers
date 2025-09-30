"use client";

import React from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

const propertiesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();

  const name = searchParams.get("name");

  return (
    <div>
      <button onClick={() => router.push("/")} className="bg-blue-500 p-2">
        go home {id}
      </button>
    </div>
  );
};

export default propertiesPage;