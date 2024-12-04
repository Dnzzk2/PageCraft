"use client";

import ProTableTemplates from "@/components/templates/ProTableTemplates";

export default function Home() {
  return (
    <main className="h-[calc(100vh-var(--header-height))] overflow-y-auto bg-main p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        <ProTableTemplates />
      </div>
    </main>
  );
}
