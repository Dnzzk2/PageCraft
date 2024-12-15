// 基础ProTable配置
export interface ProTableConfig {
  // 核心功能开关
  isSort?: boolean; // 是否显示序号列
  isSearch?: boolean; // 是否显示搜索区域
  isPageHeader?: boolean; // 是否使用PageHeaderWrapper
  // 列配置 (核心)
  columns?: ColumnConfig[];
}

export interface ColumnConfig {
  title: string; // 列标题
  dataIndex: string; // 字段名
  hideInSearch?: boolean; // 是否在搜索中隐藏
  valueType?: ValueType; // 字段类型
}

// 支持的字段类型
export type ValueType =
  | "input" // 输入框
  | "select" // 下拉选择
  | "date" // 日期
  | "dateRange"; // 日期范围
