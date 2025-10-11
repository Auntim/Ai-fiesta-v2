'use client';

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import ChatInputbox from "./_components/ChatInputbox";

export default function Home() {
  const { setTheme } = useTheme();
  return (
    <div>
      <ChatInputbox />
    </div>
  );
}
