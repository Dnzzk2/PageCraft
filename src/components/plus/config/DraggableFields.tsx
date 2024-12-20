"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableField } from "./SortableField";
import { UseFormReturn } from "react-hook-form";

interface DraggableFieldsProps {
  form: UseFormReturn<any>;
  fieldPath: string;
  renderField: (index: number) => React.ReactNode;
  fields: any[];
  getFieldId?: (field: any, index: number) => string;
}

export function DraggableFields({
  form,
  fieldPath,
  renderField,
  fields,
  getFieldId = (field, index) =>
    field?.name ? `${field.name}-${fieldPath}` : `${index}-${fieldPath}`,
}: DraggableFieldsProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = parseInt((active.id as string).split('-')[1]);
      const newIndex = parseInt((over.id as string).split('-')[1]);
      form.setValue(fieldPath, arrayMove(fields, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={fields.map((_, index) => `field-${index}`)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {fields.map((field, index) => (
            <SortableField 
              key={`field-${index}`} 
              id={`field-${index}`}
            >
              {renderField(index)}
            </SortableField>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
