"use client";

import React, { useState, useCallback } from "react";
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
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/hooks/use-toast";
import { ImportDialog } from "@/components/shared/ImportDialog";
import { generateProTable } from "@/lib/generated/proTable/genProTable";
import {
  FormValues,
  formSchema,
  FormFieldType,
  FormFieldTypeValue,
} from "@/lib/types/plus";
import { ListConfig } from "@/components/plus/ListConfig";
import { FormConfig } from "@/components/plus/FormConfig";
import { cloneDeep } from "lodash";
import { generateDrawerComponent } from "@/lib/generated/drawer";
import { generateModalComponent } from "@/lib/generated/modal/genComponent";
import { DetailConfig } from "@/components/plus/DetailConfig";
import { generateDetailComponent } from "@/lib/generated/detail/genComponent";
import { PageSelector } from "@/components/plus/config/PageSelector";
import { CodePreview } from "@/components/plus/preview/CodePreview";
import { debounce } from "lodash";

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

  const onSubmit = useCallback((data: FormValues) => {
    if (data.pages.length === 0) {
      toast({
        title: "请至少选择一个页面",
        variant: "destructive",
      });
      return;
    }

    requestAnimationFrame(() => {
      const formData = cloneDeep(data);
      const newGeneratedCode: typeof generatedCode = {};

      Promise.resolve().then(() => {
        if (data.pages.includes("list")) {
          const validColumns = data.list.columns.map((col) => ({
            title: col.title || "",
            dataIndex: col.dataIndex || "",
            hideInSearch: col.hideInSearch,
            valueType: col.valueType,
          }));

          formData.list.columns = validColumns;
          formData.list.showAdd = data.pages.includes("form");
          formData.list.addName = formData.form.componentName;
          formData.list.showEdit = !!formData.form.editAPI;
          formData.list.showDetail = data.pages.includes("detail");
          formData.list.detailName = formData.detail.componentName;
          formData.list.showDelete = !!formData.list.deleteAPI;

          newGeneratedCode.list = generateProTable(formData.list);
        }

        if (data.pages.includes("form")) {
          const {
            fields,
            addAPI,
            editAPI,
            componentName,
            componentType,
            isFooter,
            detailAPI,
          } = formData.form;
          newGeneratedCode.form =
            componentType === "drawer"
              ? generateDrawerComponent({
                  componentName: componentName || "NewDrawer",
                  fields,
                  addAPI,
                  editAPI: editAPI || undefined,
                  isFooter,
                  detailAPI,
                })
              : generateModalComponent({
                  componentName: componentName || "NewModal",
                  fields,
                  addAPI,
                  editAPI: editAPI || undefined,
                  detailAPI,
                });
        }

        if (data.pages.includes("detail")) {
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
        setActiveTab("preview");
      });
    });
  }, []);

  const handleImport = useCallback(
    debounce((columns: any[], type: "list" | "form" | "detail") => {
      if (type === "list") {
        form.setValue("list.columns", columns);
      } else {
        const fields = columns.map((col) => ({
          name: col.dataIndex,
          label: col.title,
          ...(type === "form" && {
            fieldType:
              col.valueType === "dateRange"
                ? FormFieldType.DATE_RANGE
                : col.valueType === "date"
                ? FormFieldType.DATE
                : col.valueType === "select"
                ? FormFieldType.SELECT
                : FormFieldType.INPUT,
            required: false,
          }),
        }));
        form.setValue(`${type}.fields`, fields);
      }
    }, 300),
    [form]
  );

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
                  <PageSelector form={form} />

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
                <CodePreview
                  form={form}
                  pages={pages}
                  generatedCode={generatedCode}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ImportDialog
        open={importOpen}
        onOpenChange={setImportOpen}
        onImport={(columns) => handleImport(columns, "list")}
      />
      <ImportDialog
        open={formImportOpen}
        onOpenChange={setFormImportOpen}
        onImport={(columns) => handleImport(columns, "form")}
      />
      <ImportDialog
        open={detailImportOpen}
        onOpenChange={setDetailImportOpen}
        onImport={(columns) => handleImport(columns, "detail")}
      />
    </main>
  );
}
