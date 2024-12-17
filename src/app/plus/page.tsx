"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/hooks/use-toast";
import { ImportDialog } from "@/components/shared/ImportDialog";
import { generateProTable } from "@/lib/generated/proTable/genProTable";
import {
  FormValues,
  PAGE_OPTIONS,
  formSchema,
  ValueTypeValue,
} from "@/types/plus";
import { ListConfig } from "@/components/plus/ListConfig";

export default function Plus() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pages: ["list", "form"],
      list: {
        isSort: false,
        isPageHeader: false,
        isSearch: true,
        searchAPI: "",
        columns: [],
      },
    },
  });

  const pages = form.watch("pages");
  const [importOpen, setImportOpen] = useState(false);

  function onSubmit(data: FormValues) {
    const { pages } = data;
    if (pages.length === 0) {
      toast({
        title: "请至少选择一个页面",
        variant: "destructive",
      });
      return;
    }

    // 确保所有列都有必填字段，并且转换valueType为正确的类型
    const validColumns = data.list.columns.map((col) => ({
      title: col.title || "",
      dataIndex: col.dataIndex || "",
      hideInSearch: col.hideInSearch,
      valueType: col.valueType as ValueTypeValue,
    }));

    // 构造配置
    const config = {
      isSort: data.list.isSort,
      isPageHeader: data.list.isPageHeader,
      isSearch: data.list.isSearch,
      searchAPI: data.list.searchAPI,
      columns: validColumns,
    };

    console.log(config);
    console.log(generateProTable(config));
  }

  return (
    <main className="main-container">
      <Card className="rounded-lg shadow dark:bg-zinc-900 max-w-5xl mx-auto">
        <CardHeader className="pb-0">
          <CardTitle>联动模板配置</CardTitle>
          <CardDescription>配置生成完整的CRUD页面模板</CardDescription>
          <hr />
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="config" className="w-full mt-4">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="config">基础配置</TabsTrigger>
              <TabsTrigger value="preview">代码预览</TabsTrigger>
            </TabsList>

            <TabsContent value="config" className="mt-4 space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid gap-4 bg-slate-100 dark:bg-[#27272a] p-6 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-4">
                        {PAGE_OPTIONS.map(({ id, label }) => (
                          <FormField
                            key={id}
                            control={form.control}
                            name="pages"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(id)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([...field.value, id]);
                                      } else {
                                        field.onChange(
                                          field.value?.filter(
                                            (value) => value !== id
                                          )
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="form-label">
                                  {label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {pages.includes("list") && (
                    <ListConfig
                      form={form}
                      onImportOpen={() => setImportOpen(true)}
                    />
                  )}

                  <div className="flex justify-end">
                    <Button type="submit">生成模板</Button>
                  </div>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <div className="space-y-4">{/* 这里放置代码块 */}</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <ImportDialog
        open={importOpen}
        onOpenChange={setImportOpen}
        onImport={(columns) => {
          form.setValue("list.columns", columns);
        }}
      />
    </main>
  );
}
