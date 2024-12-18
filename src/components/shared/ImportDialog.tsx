import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/lib/hooks/use-toast";
import { ColumnConfig, ValueTypeValue } from "@/types/plus";

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (columns: ColumnConfig[]) => void;
}

export function ImportDialog({
  open,
  onOpenChange,
  onImport,
}: ImportDialogProps) {
  const [value, setValue] = useState("");

  const handleImport = () => {
    try {
      // 按行分割并过滤空行
      const lines = value.split("\n").filter((line) => line.trim());

      const columns = lines.map((line) => {
        // 去除首尾空格，并按空格分割
        const parts = line.trim().split(/\s+/);
        if (parts.length < 2) {
          throw new Error(`格式错误: ${line}`);
        }

        return {
          dataIndex: parts[0], // 第一部分作为字段名
          title: parts[1], // 第二部分作为标题
          hideInSearch: true,
          valueType: "input" as ValueTypeValue,
        } as ColumnConfig;
      });

      onImport(columns);
      onOpenChange(false);
      setValue("");

      toast({
        description: "导入成功",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "格式错误，请检查输入格式",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>导入列配置</DialogTitle>
          <DialogDescription>
            请输入字段配置，每行一个字段
            <br />
            格式：字段名 显示名称
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`username 用户名
createTime 创建时间
status 状态`}
          className="min-h-[200px] font-mono"
        />
        <DialogFooter>
          <Button onClick={handleImport}>导入配置</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
