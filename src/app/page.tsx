"use client";

import ProTableTemplates from "@/components/templates/ProTableTemplates";
import ModalTemplates from "@/components/templates/ModalTemplates";

export default function Home() {
  return (
    <main className="h-[calc(100vh-var(--header-height))] overflow-y-auto bg-main p-6 @container">
      <div className="flex flex-col gap-6 @[800px]:hidden">
        <ProTableTemplates />
        <ModalTemplates />
      </div>
      <div className="hidden @[800px]:block">
        <div className="columns-2 gap-6">
          <div className="break-inside-avoid mb-6">
            <ProTableTemplates />
          </div>
          <div className="break-inside-avoid mb-6">
            <ModalTemplates />
          </div>
        </div>
      </div>
    </main>
  );
}
