import {
  FormValues,
  FORM_FIELD_TYPE_OPTIONS,
  FormFieldType,
} from "@/lib/types/plus";
import { InfoIcon, PlusIcon, TrashIcon, Upload } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

interface FormConfigProps {
  form: UseFormReturn<FormValues>;
  onImportOpen: () => void;
}

export function FormConfig({ form, onImportOpen }: FormConfigProps) {
  return (
    <div className="bg-slate-100 dark:bg-[#27272a] p-6 rounded-lg space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-[15px] font-semibold">新增/编辑配置</h3>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <InfoIcon className="w-4 h-4" /> 配置生成表单页模板
        </span>
      </div>

      {/* 组件类型 */}
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground mb-2">组件类型</div>
        <FormField
          control={form.control}
          name="form.componentType"
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
                    <RadioGroupItem value="modal" id="modal" />
                    <label className="text-sm" htmlFor="modal">
                      Modal
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="drawer" id="drawer" />
                    <label className="text-sm" htmlFor="drawer">
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
          name="form.componentName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white dark:bg-[#18181b] max-w-lg"
                  placeholder="请输入组件名称，例如: NewModal，默认为New"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* API配置组 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-2">新增API</div>
          <FormField
            control={form.control}
            name="form.addAPI"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white dark:bg-[#18181b] max-w-lg"
                    placeholder="请输入新增API，例如: add"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-2">编辑API</div>
          <FormField
            control={form.control}
            name="form.editAPI"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white dark:bg-[#18181b] max-w-lg"
                    placeholder="请输入编辑API，例如: edit"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-2">详情API</div>
          <FormField
            control={form.control}
            name="form.detailAPI"
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
      </div>

      {/* 表单字段配置 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <div>表单字段配置</div>
          <div className="flex items-center gap-2">
            <Button size="sm" type="button" onClick={onImportOpen}>
              <Upload className="w-4 h-4 mr-1" /> 一键导入
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                const fields = form.getValues("form.fields") || [];
                form.setValue("form.fields", [
                  ...fields,
                  {
                    name: "",
                    label: "",
                    fieldType: FormFieldType.INPUT,
                    required: false,
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
          {form.watch("form.fields")?.map((_, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 items-start">
              <FormField
                control={form.control}
                name={`form.fields.${index}.name`}
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
                name={`form.fields.${index}.label`}
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

              <FormField
                control={form.control}
                name={`form.fields.${index}.fieldType`}
                render={({ field }) => (
                  <FormItem>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="bg-white dark:bg-[#18181b]">
                          <SelectValue placeholder="选择类型" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {FORM_FIELD_TYPE_OPTIONS.map((option) => (
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
                  name={`form.fields.${index}.required`}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="form-label">必填</FormLabel>
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const fields = form.getValues("form.fields");
                    form.setValue(
                      "form.fields",
                      fields.filter((_, i) => i !== index)
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
