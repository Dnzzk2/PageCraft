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
  generateDrawerComponent,
  generateImport,
  generateState,
  generateRender,
} from "@/lib/generated/drawer";
import CodeBlock from "../shared/CodeBlock";
import LoadingOverlay from "../shared/LoadingOverlay";
import { Switch } from "../ui/switch";
import { useChange } from "@/lib/hooks/useChange";

const info: InfoType = {
  title: "Drawer 抽屉模板",
  description: "最基础的Drawer抽屉模板，内容自定义。",
  updatedAt: "2024-12-13",
  language: "jsx",
};

const DrawerTemplates = () => {
  const [componentName, setComponentName] = useState("NewDrawer");
  const { isChanging, changeStatus } = useChange();
  const [isFooter, setIsFooter] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    changeStatus(setComponentName, value);
  };

  const config = { componentName, isFooter };

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
          <Label htmlFor="isFooter">是否显示底部</Label>
          <Switch
            id="isFooter"
            checked={isFooter}
            onCheckedChange={() => changeStatus(setIsFooter, !isFooter)}
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
              <h3 className="text-base font-semibold mb-1">4. Drawer组件</h3>
              <CodeBlock
                language={info.language}
                code={generateDrawerComponent(config)}
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

export default DrawerTemplates;
