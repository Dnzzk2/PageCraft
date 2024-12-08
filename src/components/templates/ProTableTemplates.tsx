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
import { generateProTable } from "@/lib/generated/proTable/genProTable";
import CodeBlock from "../shared/CodeBlock";
import LoadingOverlay from "../shared/LoadingOverlay";

const info: InfoType = {
  title: "ProTable 页面模板",
  description: "最基础的ProTable页面模板，快速构建主页。",
  updatedAt: "2024-12-04",
  language: "jsx",
};

const ProTableTemplates = () => {
  const [isSort, setIsSort] = useState(false);
  const [isPageHeader, setIsPageHeader] = useState(true);
  const [isSearch, setIsSearch] = useState(true);
  const [isChanging, setIsChanging] = useState(false);

  const change = (func: (value: any) => void, value: boolean) => {
    setIsChanging(true);
    setTimeout(() => {
      func(value);
      setIsChanging(false);
    }, 300);
  };

  const handleSortChange = (checked: boolean) => {
    change(setIsSort, checked);
  };

  const handlePageHeaderChange = (checked: boolean) => {
    change(setIsPageHeader, checked);
  };

  const handleSearchChange = (checked: boolean) => {
    change(setIsSearch, checked);
  };

  return (
    <Card className="rounded-lg shadow dark:bg-zinc-900">
      <CardHeader className="pb-0">
        <CardTitle>{info.title}</CardTitle>
        <CardDescription>{info.description}</CardDescription>
        <hr />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 h-[60px]">
          <Label htmlFor="page-header-mode">页头</Label>
          <Switch
            id="page-header-mode"
            checked={isPageHeader}
            onCheckedChange={handlePageHeaderChange}
          />
          <Label htmlFor="search-mode">搜索</Label>
          <Switch
            id="search-mode"
            checked={isSearch}
            onCheckedChange={handleSearchChange}
          />
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
            code={generateProTable({ isSort, isPageHeader, isSearch })}
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
