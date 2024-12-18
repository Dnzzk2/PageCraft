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
  FormFieldType,
} from "@/lib/types/plus";
import { ListConfig } from "@/components/plus/ListConfig";
import { FormConfig } from "@/components/plus/FormConfig";
import { cloneDeep } from "lodash";
import { generateDrawerComponent } from "@/lib/generated/drawer";
import { generateModalComponent } from "@/lib/generated/modal/genComponent";
import { DetailConfig } from "@/components/plus/DetailConfig";
import { generateDetailComponent } from "@/lib/generated/detail/genComponent";
import CodeBlock from "@/components/shared/CodeBlock";

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
        deleteAPI: "",
        columns: [],
      },
      form: {
        componentName: "",
        componentType: "modal",
        addAPI: "",
        editAPI: "",
        detailAPI: "",
        fields: [],
        isFooter: false,
      },
      detail: {
        componentName: "",
        componentType: "modal",
        detailAPI: "",
        fields: [],
      },
    },
  });

  const pages = form.watch("pages");
  const [importOpen, setImportOpen] = useState(false);
  const [formImportOpen, setFormImportOpen] = useState(false);
  const [detailImportOpen, setDetailImportOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("config");
  const [generatedCode, setGeneratedCode] = useState<{
    list?: string;
    form?: string;
    detail?: string;
  }>({});

  function onSubmit(data: FormValues) {
    console.log(data);
    const { pages } = data;
    const formData = cloneDeep(data);
    if (pages.length === 0) {
      toast({
        title: "请至少选择一个页面",
        variant: "destructive",
      });
      return;
    }

    const newGeneratedCode: typeof generatedCode = {};

    if (pages.includes("list")) {
      // 确保所有列都有必填字段，并且转换valueType为正确的类型
      const validColumns = data.list.columns.map((col) => ({
        title: col.title || "",
        dataIndex: col.dataIndex || "",
        hideInSearch: col.hideInSearch,
        valueType: col.valueType as ValueTypeValue,
      }));

      formData.list.columns = validColumns;
      if (pages.includes("form")) {
        formData.list.showAdd = true;
        formData.list.addName = formData.form.componentName;
        if (formData.form.editAPI) {
          formData.list.showEdit = true;
        }
      }
      if (pages.includes("detail")) {
        formData.list.showDetail = true;
        formData.list.detailName = formData.detail.componentName;
      }
      if (formData.list.deleteAPI) {
        formData.list.showDelete = true;
      }

      newGeneratedCode.list = generateProTable(formData.list);
    }

    if (pages.includes("form")) {
      const {
        fields,
        addAPI,
        editAPI,
        componentName,
        componentType,
        isFooter,
      } = formData.form;

      if (componentType === "drawer") {
        newGeneratedCode.form = generateDrawerComponent({
          componentName: componentName || "NewDrawer",
          fields,
          addAPI,
          editAPI: editAPI || undefined,
          isFooter: isFooter,
        });
      } else {
        newGeneratedCode.form = generateModalComponent({
          componentName: componentName || "NewModal",
          fields,
          addAPI,
          editAPI: editAPI || undefined,
        });
      }
    }

    if (pages.includes("detail")) {
      const { componentName, componentType, detailAPI, fields } =
        formData.detail;
      newGeneratedCode.detail = generateDetailComponent({
        componentName: componentName || "DetailModal",
        componentType: componentType as "modal" | "drawer",
        detailAPI: detailAPI || "detail",
        fields,
      });
    }

    setGeneratedCode(newGeneratedCode);
    // 生成代码后自动跳转到预览标签
    setActiveTab("preview");
  }

  // 生成代码预览说明
  const getCodePreviewDescription = () => {
    if (pages.length === 0) return "请选择要生成的页面类型";

    if (pages.length === 1) {
      if (pages.includes("list")) {
        return "这是一个基础的ProTable列表页面，你可以：\n1. 配置搜索、排序、页头等功能\n2. 自定义列的展示和搜索\n3. 添加API配置";
      }
      if (pages.includes("form")) {
        return "这是一个基础的表单页面，你可以：\n1. 选择Modal或Drawer形式\n2. 配置新增、编辑API\n3. 自定义表单字段和验证规则";
      }
      if (pages.includes("detail")) {
        return "这是一个基础的详情页面，你可以：\n1. 选择Modal或Drawer形式\n2. 配置详情API\n3. 自定义展示字段";
      }
    }

    if (pages.length === 3) {
      return "这是一个完整的CRUD页面组合，包含：\n1. 列表页的展示和操作\n2. 表单页的新增和编辑\n3. 详情页的查看\n所有页面都是联动的，可以无缝配合使用。";
    }

    if (pages.includes("list") && pages.includes("form")) {
      return "这是一个基础的增删改查页面组合，包含：\n1. 列表页的展示和操作\n2. 表单页的新增和编辑\n所有页面都是联动的，可以无缝配合使用。";
    }

    if (pages.includes("list") && pages.includes("detail")) {
      return "这是一个基础的列表详情页面组合，包含：\n1. 列表页的展示和操作\n2. 详情页的查看\n所有页面都是联动的，可以无缝配合使用。";
    }

    if (pages.includes("form") && pages.includes("detail")) {
      return "这是表单和详情页面的组合，你可以：\n1. 分别配置表单和详情的展示形式\n2. 配置相关API\n3. 自定义字段配置";
    }
  };

  // 获取代码块的高度
  const getCodeBlockHeight = () => {
    // 如果只有一个页面，使用默认高度
    if (pages.length === 1) return "600px";
    // 如果是联动模板，使用更大的高度
    return "500px";
  };

  return (
    <main className="main-container">
      <Card className="rounded-lg shadow dark:bg-zinc-900 max-w-5xl mx-auto">
        <CardHeader className="pb-0">
          <CardTitle>联动模板配置</CardTitle>
          <CardDescription>配置生成完整的CRUD页面模板</CardDescription>
          <hr />
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full mt-4"
          >
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

                  {pages.includes("form") && (
                    <FormConfig
                      form={form}
                      onImportOpen={() => setFormImportOpen(true)}
                    />
                  )}

                  {pages.includes("detail") && (
                    <DetailConfig
                      form={form}
                      onImportOpen={() => setDetailImportOpen(true)}
                    />
                  )}

                  <div className="flex justify-end">
                    <Button type="submit">生成代码</Button>
                  </div>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <div className="space-y-4">
                {Object.keys(generatedCode).length > 0 && (
                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                    {getCodePreviewDescription()}
                  </div>
                )}
                {generatedCode.list && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">列表页代码：</div>
                    <CodeBlock
                      language="jsx"
                      code={generatedCode.list}
                      customStyle={{ maxHeight: getCodeBlockHeight() }}
                    />
                  </div>
                )}
                {generatedCode.form && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">表单页代码：</div>
                    <CodeBlock
                      language="jsx"
                      code={generatedCode.form}
                      customStyle={{ maxHeight: getCodeBlockHeight() }}
                    />
                  </div>
                )}
                {generatedCode.detail && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">详情页代码：</div>
                    <CodeBlock
                      language="jsx"
                      code={generatedCode.detail}
                      customStyle={{ maxHeight: getCodeBlockHeight() }}
                    />
                  </div>
                )}
              </div>
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
      <ImportDialog
        open={formImportOpen}
        onOpenChange={setFormImportOpen}
        onImport={(columns) => {
          // 将导入的列转换为表单字段
          const fields = columns.map((col) => ({
            name: col.dataIndex,
            label: col.title,
            fieldType:
              col.valueType === "dateRange"
                ? FormFieldType.DATE_RANGE
                : col.valueType === "date"
                ? FormFieldType.DATE
                : col.valueType === "select"
                ? FormFieldType.SELECT
                : FormFieldType.INPUT,
            required: false,
          }));
          form.setValue("form.fields", fields);
        }}
      />
      <ImportDialog
        open={detailImportOpen}
        onOpenChange={setDetailImportOpen}
        onImport={(columns) => {
          // 将导入的列转换为详情字段
          const fields = columns.map((col) => ({
            name: col.dataIndex,
            label: col.title,
          }));
          form.setValue("detail.fields", fields);
        }}
      />
    </main>
  );
}
