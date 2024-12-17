import { z } from "zod";

// 页面类型
export const PageType = {
  LIST: "list",
  FORM: "form",
  DETAIL: "detail",
} as const;

export type PageTypeValue = (typeof PageType)[keyof typeof PageType];

// 字段类型
export const ValueType = {
  INPUT: "input",
  SELECT: "select",
  DATE: "date",
  DATE_RANGE: "dateRange",
} as const;

export type ValueTypeValue = (typeof ValueType)[keyof typeof ValueType];

// 列配置
export interface ColumnConfig {
  title: string;
  dataIndex: string;
  hideInSearch?: boolean;
  valueType?: ValueTypeValue;
}

// ProTable配置
export interface ProTableConfig {
  isSort?: boolean;
  isSearch?: boolean;
  isPageHeader?: boolean;
  searchAPI?: string;
  columns?: ColumnConfig[];
}

// 表单Schema
export const formSchema = z.object({
  pages: z.array(z.enum([PageType.LIST, PageType.FORM, PageType.DETAIL])),
  list: z.object({
    isSort: z.boolean(),
    isPageHeader: z.boolean(),
    isSearch: z.boolean(),
    searchAPI: z.string(),
    columns: z.array(
      z.object({
        title: z.string().min(1, "请输入列标题"),
        dataIndex: z.string().min(1, "请输入字段名"),
        hideInSearch: z.boolean(),
        valueType: z.enum([
          ValueType.INPUT,
          ValueType.SELECT,
          ValueType.DATE,
          ValueType.DATE_RANGE,
        ]),
      })
    ),
  }),
});

export type FormValues = z.infer<typeof formSchema>;

// 常量配置
export const PAGE_OPTIONS = [
  { id: PageType.LIST, label: "列表页" },
  { id: PageType.FORM, label: "新增/编辑页" },
  { id: PageType.DETAIL, label: "详情页" },
] as const;

export const VALUE_TYPE_OPTIONS = [
  { value: ValueType.INPUT, label: "默认文本框" },
  { value: ValueType.SELECT, label: "下拉选择" },
  { value: ValueType.DATE, label: "日期" },
  { value: ValueType.DATE_RANGE, label: "日期范围" },
] as const; 