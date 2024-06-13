"use client";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center w-full">
        <Button />
      </div>
    </>
  );
}
