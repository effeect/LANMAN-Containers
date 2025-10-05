import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          LANMAN Home Page
        </h1>
        <p className="text-lg text-gray-700">WORK IN PROGRESS</p>
        <Link href="/commands">
          <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Click Me to go to commands page
          </button>
        </Link>
      </main>
    </>
  );
}
