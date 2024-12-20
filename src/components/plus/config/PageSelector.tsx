"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PAGE_OPTIONS } from "@/lib/types/plus";
import { UseFormReturn } from "react-hook-form";

interface PageSelectorProps {
  form: UseFormReturn<any>;
}

export function PageSelector({ form }: PageSelectorProps) {
  return (
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
                            field.value?.filter((value: string) => value !== id)
                          );
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel className="form-label">{label}</FormLabel>
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 