"use client";

import React from "react";
import { InfoType } from "@/lib/types/InfoType";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import genProTableTemplate from "@/lib/generated/genProTable";

const info: InfoType = {
  title: "ProTable 页面模板",
  description: "快速构建 ProTable 页面，最基础的模板。",
  updatedAt: "2024-12-02",
  language: "jsx",
  template: genProTableTemplate,
};

const ProTableTemplates = () => {
  return (
    <Card className="rounded-lg shadow">
      <CardHeader>
        <CardTitle>{info.title}</CardTitle>
        <CardDescription>{info.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <SyntaxHighlighter
          language={info.language}
          style={oneDark}
          className="syntax-highlighter"
          customStyle={{
            fontSize: "12px",
            height: "300px",
          }}
        >
          {info.template({ isSort: true })}
        </SyntaxHighlighter>
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
