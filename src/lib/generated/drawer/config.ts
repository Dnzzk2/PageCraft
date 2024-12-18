import { FormFieldTypeValue } from "@/lib/types/plus";

// Drawer类型配置
export type DrawerConfig = {
  componentName: string;
  isFooter: boolean;
  fields: FormFieldTypeValue[];
  addAPI: string;
  editAPI: string;
  detailAPI: string;
};
