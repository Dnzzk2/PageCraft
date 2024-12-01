"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [generatedCode, setGeneratedCode] = useState("");

  return (
    <div className="h-[calc(100vh-var(--header-height))] flex flex-col">
      <div className="flex-1 flex flex-col p-6 bg-[#e4e7ed] dark:bg-[#000000]">
        <Card className="max-w-5xl w-full mx-auto">
          {/* 输入区域 */}
          <div className="p-6 space-y-6">
            {/* 配置区域 */}
            {/* 操作按钮区 */}
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="flex gap-2 text-sm text-muted-foreground">
                <button className="hover:text-foreground">格式说明</button>
                <span>|</span>
                <button className="hover:text-foreground">增强配置</button>
              </div>
              <div className="flex-1 flex justify-end gap-2">
                <Button variant="outline">重置</Button>
                <Button
                  onClick={() => {
                    setGeneratedCode("test");
                  }}
                >
                  生成代码
                </Button>
              </div>
            </div>

            {/* 生成的代码区域 */}
            {generatedCode && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">生成结果</h3>
                  <Button variant="outline" size="sm">
                    复制代码
                  </Button>
                </div>
                <div className="bg-muted rounded-md p-4 font-mono text-sm">
                  {generatedCode}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
