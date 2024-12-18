import React from "react";
import { FormValues, VALUE_TYPE_OPTIONS, ValueType } from "@/lib/types/plus";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BadgePlus, InfoIcon, PlusIcon, TrashIcon, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ListConfigProps {
  form: UseFormReturn<FormValues>;
  onImportOpen: () => void;
}

export function ListConfig({ form, onImportOpen }: ListConfigProps) {
  return (
    <div className="bg-slate-100 dark:bg-[#27272a] p-6 rounded-lg space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-[15px] font-semibold">列表页配置</h3>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <InfoIcon className="w-4 h-4" /> 配置生成列表页模板
        </span>
      </div>

      {/* 功能开关组 */}
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground mb-2">功能开关</div>
        <div className="flex flex-wrap gap-4">
          <FormField
            control={form.control}
            name="list.isSearch"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="form-label">启用搜索</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="list.isSort"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="form-label">启用排序</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="list.isPageHeader"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="form-label">显示页头</FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* API配置组 */}
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground mb-2">API 配置</div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="list.searchAPI"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white dark:bg-[#18181b] max-w-lg"
                    placeholder="请输入查询API，例如: /api/users/list 中的list"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="list.deleteAPI"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white dark:bg-[#18181b] max-w-lg"
                    placeholder="请输入删除API，例如: delete"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* columns配置组 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          Columns 配置
          <div className="flex items-center gap-2">
            <Button size="sm" type="button" onClick={onImportOpen}>
              <Upload className="w-4 h-4 mr-1" /> 一键导入
            </Button>
            <Button
              size="sm"
              type="button"
              onClick={() => {
                const columns = form.getValues("list.columns");
                form.setValue("list.columns", [
                  ...columns,
                  {
                    title: "",
                    dataIndex: "",
                    hideInSearch: true,
                    valueType: ValueType.INPUT,
                  },
                ]);
              }}
            >
              <PlusIcon className="w-4 h-4 mr-1" />
              新增列
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {form.watch("list.columns")?.map((_, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 items-start">
              <FormField
                control={form.control}
                name={`list.columns.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="列标题"
                        className="bg-white dark:bg-[#18181b] max-w-lg"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`list.columns.${index}.dataIndex`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="字段名"
                        className="bg-white dark:bg-[#18181b] max-w-lg"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`list.columns.${index}.valueType`}
                render={({ field }) => (
                  <FormItem>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="bg-white dark:bg-[#18181b] max-w-lg">
                          <SelectValue placeholder="选择类型" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {VALUE_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`list.columns.${index}.hideInSearch`}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="form-label">隐藏搜索</FormLabel>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    const columns = form.getValues("list.columns");
                    form.setValue(
                      "list.columns",
                      columns.filter((_, i) => i !== index)
                    );
                  }}
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
