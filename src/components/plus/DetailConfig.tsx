import React from "react";
import { FormValues } from "@/lib/types/plus";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InfoIcon, PlusIcon, TrashIcon, Upload } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DetailConfigProps {
  form: UseFormReturn<FormValues>;
  onImportOpen: () => void;
}

export function DetailConfig({ form, onImportOpen }: DetailConfigProps) {
  return (
    <div className="bg-slate-100 dark:bg-[#27272a] p-6 rounded-lg space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-[15px] font-semibold">详情页配置</h3>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <InfoIcon className="w-4 h-4" /> 如果有bug，请及时反馈，谢谢
        </span>
      </div>

      {/* 组件类型 */}
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground mb-2">组件类型</div>
        <FormField
          control={form.control}
          name="detail.componentType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  {...field}
                  className="flex items-center gap-4"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="modal" id="detail-modal" />
                    <label className="text-sm" htmlFor="detail-modal">
                      Modal
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="drawer" id="detail-drawer" />
                    <label className="text-sm" htmlFor="detail-drawer">
                      Drawer
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* 组件名称 */}
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground mb-2">组件名称</div>
        <FormField
          control={form.control}
          name="detail.componentName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white dark:bg-[#18181b] max-w-lg"
                  placeholder="请输入组件名称，例如: DetailModal，默认为DetailModal"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* API配置 */}
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground mb-2">API 配置</div>
        <FormField
          control={form.control}
          name="detail.detailAPI"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white dark:bg-[#18181b] max-w-lg"
                  placeholder="请输入详情API，例如: detail"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* 字段配置 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <div>字段配置</div>
          <div className="flex items-center gap-2">
            <Button size="sm" type="button" onClick={onImportOpen}>
              <Upload className="w-4 h-4 mr-1" /> 一键导入
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                const fields = form.getValues("detail.fields") || [];
                form.setValue("detail.fields", [
                  ...fields,
                  {
                    name: "",
                    label: "",
                  },
                ]);
              }}
            >
              <PlusIcon className="w-4 h-4 mr-1" />
              添加字段
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {form.watch("detail.fields")?.map((_, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-start">
              <FormField
                control={form.control}
                name={`detail.fields.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white dark:bg-[#18181b]"
                        placeholder="字段名"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`detail.fields.${index}.label`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white dark:bg-[#18181b]"
                        placeholder="标签名"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  const fields = form.getValues("detail.fields");
                  form.setValue(
                    "detail.fields",
                    fields.filter((_, i) => i !== index)
                  );
                }}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
