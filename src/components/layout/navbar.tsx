"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Navbar() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center pl-1">
      <div className="flex flex-1 items-center gap-2">
        <Image
          src="/logo/favicon-512x512.png"
          alt="PageCraft"
          width={28}
          height={28}
        />
        <span className="font-semibold">PageCraft</span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <SunIcon className="scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute  scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </div>
  );
}
