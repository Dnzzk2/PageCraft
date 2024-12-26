"use client";

import CodeBlock from "@/components/shared/CodeBlock";
import { generateImport } from "@/lib/generated/common/genImport";
import { generateRender } from "@/lib/generated/common/genRender";
import { generateState } from "@/lib/generated/common/genState";
import { UseFormReturn } from "react-hook-form";

const getComponentName = (
  type: "form" | "detail",
  form: UseFormReturn<any>
) => {
  const defaultName = type === "form" ? "NewForm" : "DetailModal";
  return form.watch(`${type}.componentName`) || defaultName;
};

interface CodePreviewProps {
  form: UseFormReturn<any>;
  pages: string[];
  generatedCode: {
    list?: string;
    form?: string;
    detail?: string;
  };
}

export function CodePreview({ form, pages, generatedCode }: CodePreviewProps) {
  // 获取代码块的高度
  const getCodeBlockHeight = () => {
    return pages.length === 1 ? "600px" : "500px";
  };

  if (Object.keys(generatedCode).length === 0) {
    return null;
  }

  if (pages.includes("list")) {
    return (
      <div className="space-y-2">
        <div className="text-sm font-medium">列表页代码：</div>
        <CodeBlock
          language="jsx"
          code={generatedCode.list}
          customStyle={{ maxHeight: getCodeBlockHeight() }}
        />
        {generatedCode.form && (
          <div className="mt-4">
            <div className="text-sm font-medium">表单页代码：</div>
            <CodeBlock
              language="jsx"
              code={generatedCode.form}
              customStyle={{ maxHeight: getCodeBlockHeight() }}
            />
          </div>
        )}
        {generatedCode.detail && (
          <div className="mt-4">
            <div className="text-sm font-medium">详情页代码：</div>
            <CodeBlock
              language="jsx"
              code={generatedCode.detail}
              customStyle={{ maxHeight: getCodeBlockHeight() }}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {["form", "detail"]
        .filter((page) => pages.includes(page as "form" | "detail"))
        .map((type: "form" | "detail", index) => (
          <div key={type} className="space-y-4">
            {index > 0 && <hr className="my-8" />}
            <h2 className="text-lg font-semibold">
              {type === "form" ? "表单组件" : "详情组件"}
            </h2>
            <div>
              <h3 className="text-base font-semibold mb-1">1. 导入语句</h3>
              <CodeBlock
                language="jsx"
                code={generateImport({
                  componentName: getComponentName(type, form),
                })}
              />
            </div>

            <div>
              <h3 className="text-base font-semibold mb-1">2. 状态定义</h3>
              <CodeBlock
                language="jsx"
                code={generateState({
                  componentName: getComponentName(type, form),
                  isForm: type === "form",
                })}
              />
            </div>

            <div>
              <h3 className="text-base font-semibold mb-1">3. 组件渲染</h3>
              <CodeBlock
                language="jsx"
                code={generateRender({
                  componentName: getComponentName(type, form),
                  isForm: type === "form",
                })}
              />
            </div>

            <div>
              <h3 className="text-base font-semibold mb-1">4. 组件代码</h3>
              <CodeBlock
                language="jsx"
                code={
                  type === "form" ? generatedCode.form : generatedCode.detail
                }
                customStyle={{ maxHeight: getCodeBlockHeight() }}
              />
            </div>
          </div>
        ))}
    </>
  );
}
