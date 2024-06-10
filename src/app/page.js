"use client";
import Hero from "@/components/Hero";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center w-full">
        <button
          onClick={() => router.push("/todo")}
          className="px-4 py-2 bg-yellow-400 text-black hover:bg-green-400 transition-all duration-300 ease-in-out"
        >
          Click me to check todo
        </button>
      </div>
    </>
  );
}
