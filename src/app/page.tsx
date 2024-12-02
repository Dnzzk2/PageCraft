"use client";

import ProTableTemplates from "@/components/templates/ProTableTemplates";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function Home() {
  return (
    <main className="h-[calc(100vh-var(--header-height))] overflow-y-auto bg-main p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card className="p-4 rounded-lg shadow">
          <ProTableTemplates />
        </Card>
      </div>
    </main>
  );
}
