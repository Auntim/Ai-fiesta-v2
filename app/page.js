'use client';

// import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import ChatInputbox from "./_components/ChatInputbox";
import { Suspense } from "react";

export default function Home() {
  const { setTheme } = useTheme();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatInputbox />
    </Suspense >
  );
}
