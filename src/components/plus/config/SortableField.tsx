"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableFieldProps {
  id: string;
  children: React.ReactNode;
}

export function SortableField({ id, children }: SortableFieldProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id,
    });

  const style = transform
    ? {
        transform: CSS.Transform.toString(transform),
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("relative group", isDragging && "opacity-50")}
    >
      <div
        className={cn(
          "absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-grab",
          isDragging && "opacity-100"
        )}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="pl-8">{children}</div>
    </div>
  );
}
