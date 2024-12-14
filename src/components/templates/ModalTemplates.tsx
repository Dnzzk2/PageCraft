"use client";

import React, { useState } from "react";
import { InfoType } from "@/lib/types/InfoType";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  generateModalComponent,
  generateImport,
  generateState,
  generateRender,
} from "@/lib/generated/modal";
import CodeBlock from "../shared/CodeBlock";
import LoadingOverlay from "../shared/LoadingOverlay";
import { useChange } from "@/lib/hooks/useChange";

const info: InfoType = {
  title: "Modal 弹窗模板",
  description: "最基础的Modal弹窗模板，内容自定义。",
  updatedAt: "2024-12-04",
  language: "jsx",
};

const ModalTemplates = () => {
  const [componentName, setComponentName] = useState("NewModal");
  const { isChanging, changeStatus } = useChange();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    changeStatus(setComponentName, value);
  };

  const config = { componentName };

  return (
    <Card className="rounded-lg shadow dark:bg-zinc-900">
      <CardHeader className="pb-0">
        <CardTitle>{info.title}</CardTitle>
        <CardDescription>{info.description}</CardDescription>
        <hr />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 h-[60px]">
          <Label htmlFor="component-name">组件名称</Label>
          <Input
            id="component-name"
            defaultValue={componentName}
            onChange={handleNameChange}
            className="max-w-[200px]"
            placeholder="输入组件名称"
          />
        </div>
        <LoadingOverlay loading={isChanging}>
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-semibold mb-1">1. 导入语句</h3>
              <CodeBlock
                language={info.language}
                code={generateImport(config)}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold mb-1">2. 状态定义</h3>
              <CodeBlock
                language={info.language}
                code={generateState(config)}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold mb-1">3. 组件渲染</h3>
              <CodeBlock
                language={info.language}
                code={generateRender(config)}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold mb-1">4. Modal组件</h3>
              <CodeBlock
                language={info.language}
                code={generateModalComponent(config)}
              />
            </div>
          </div>
        </LoadingOverlay>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-muted-foreground ml-1">
          更新时间：{info.updatedAt}
        </span>
      </CardFooter>
    </Card>
  );
};

export default ModalTemplates;
