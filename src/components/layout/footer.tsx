"use client";

import { Github } from "lucide-react";

export function Footer() {
  return (
    <div className="flex h-32 items-center justify-center rounded-lg bg-[#e8e8e9] dark:bg-background/20 border border-border/40 shadow-lg shadow-purple-100 dark:shadow-none">
      <a
        href="https://github.com/Dnzzk2/PageCraft"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Github size={20} />
        <span>GitHub</span>
      </a>
    </div>
  );
}
