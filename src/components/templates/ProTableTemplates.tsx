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
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { generateProTable } from "@/lib/generated/genProTable";
import CodeBlock from "../shared/CodeBlock";
import LoadingOverlay from "../shared/LoadingOverlay";

const info: InfoType = {
  title: "ProTable 页面模板",
  description: "快速构建 ProTable 页面，最基础的模板。",
  updatedAt: "2024-12-04",
  language: "jsx",
  template: generateProTable,
};

const ProTableTemplates = () => {
  const [isSort, setIsSort] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const handleSortChange = (checked: boolean) => {
    setIsChanging(true);
    setTimeout(() => {
      setIsSort(checked);
      setIsChanging(false);
    }, 300);
  };

  return (
    <Card className="rounded-lg shadow dark:bg-zinc-900">
      <CardHeader className="pb-0">
        <CardTitle>{info.title}</CardTitle>
        <CardDescription>{info.description}</CardDescription>
        <hr />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 py-2">
          <Label htmlFor="sort-mode">序号列</Label>
          <Switch
            id="sort-mode"
            checked={isSort}
            onCheckedChange={handleSortChange}
          />
        </div>
        <LoadingOverlay loading={isChanging}>
          <CodeBlock
            language={info.language}
            code={info.template({ isSort })}
          />
        </LoadingOverlay>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-muted-foreground ml-1">
          更新时间:{info.updatedAt}
        </span>
      </CardFooter>
    </Card>
  );
};

export default ProTableTemplates;
