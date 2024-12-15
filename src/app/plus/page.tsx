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

// 定义表单 schema
const formSchema = z.object({
  pages: z.object({
    list: z.boolean().default(false),
    detail: z.boolean().default(false),
    form: z.boolean().default(false),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Plus() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pages: {
        list: false,
        detail: false,
        form: false,
      },
    },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
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
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h3 className="text-[15px] font-medium">
                        1、选择需要生成的页面
                      </h3>
                      <div className="flex flex-wrap gap-4">
                        <FormField
                          control={form.control}
                          name="pages.list"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="!mt-0">列表页</FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="pages.detail"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="!mt-0">详情页</FormLabel>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="pages.form"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="!mt-0">
                                新增/编辑页
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
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
