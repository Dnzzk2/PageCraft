"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const pageOptions = [
  { id: "list", label: "列表页" },
  { id: "form", label: "新增/编辑页" },
  { id: "detail", label: "详情页" },
] as const;

// 修改 schema
const formSchema = z.object({
  pages: z.array(z.enum(["list", "form", "detail"])),
  list: z.object({
    isSort: z.boolean(),
    isPageHeader: z.boolean(),
    isSearch: z.boolean(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Plus() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pages: ["list", "form"],
      list: {
        isSort: false,
        isPageHeader: false,
        isSearch: true,
      },
    },
  });

  const pages = form.watch("pages");

  function onSubmit(data: FormValues) {
    const { pages } = data;
    if (pages.length === 0) {
      toast({
        title: "请至少选择一个页面",
        variant: "destructive",
      });
      return;
    }
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
                  <div className="grid gap-4 bg-slate-100 dark:bg-zinc-700 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-4">
                        {pageOptions.map(({ id, label }) => (
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
                    <div className="bg-slate-100 dark:bg-zinc-700 p-4 rounded-lg">
                      <h3 className="text-[15px] font-semibold">
                        🔍 列表页配置
                      </h3>
                    </div>
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
    </main>
  );
}
