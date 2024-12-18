"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CodeBlock from "@/components/shared/CodeBlock";

const UTILS_CODE = [
  {
    title: "Table Response",
    description:
      "处理ProTable和Table的响应数据，主要用于处理分页数据。当前页数据为空时，自动跳转到上一页。",
    code: `/**
 * @param {React.MutableRefObject} actionRef proTable实例
 * @param {Object} res 请求响应的数据
 * @param {String} type 表格类型 table | proTable（default）
 * */
export function handleTableResponse(config) {
  const { actionRef, res, type = 'proTable' } = config;
  if (res) {
    const { current, pageNum, pageSize, total, params, data } = res.data;
    //判断当前页面不是第一页，并且数据又为空的情况
    if ((params?.length === 0 || data?.length === 0) && (current > 1 || pageNum > 1)) {
      if (type === 'proTable') {
        //异步设置page信息，并且重新加载
        setTimeout(() => {
          actionRef.current.setPageInfo({
            current: (current || pageNum) - 1,
            pageSize: pageSize,
            total: total,
          });
          actionRef.current.reload();
        }, 0);
      } else {
        //ui层判断reload如果为true，就把当前页码减一后再次请求
        return {
          data: [],
          reload: true,
        };
      }
    }
    return {
      data: params ?? data,
      total: total,
    };
  } else {
    return {
      data: [],
      total: 0,
    };
  }
}`,
  },
  // 这里可以继续添加其他工具代码
];

export default function Utils() {
  return (
    <div className="main-container">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UTILS_CODE.map((item, index) => (
            <Card
              key={index}
              className="rounded-lg shadow dark:bg-zinc-900 h-full"
            >
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  language="jsx"
                  code={item.code}
                  customStyle={{ maxHeight: "400px" }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
