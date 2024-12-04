import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useToast } from "@/lib/hooks/use-toast";
import { CheckIcon, XCircle } from "lucide-react";

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        description: (
          <div className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-green-500" />
            <span>已复制到剪贴板</span>
          </div>
        ),
        duration: 2000,
        className: "dark:bg-zinc-900",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description: (
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-500" />
            <span>复制失败</span>
          </div>
        ),
        duration: 2000,
        className: "dark:bg-zinc-900",
      });
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 absolute top-2 right-5 ">
        <div
          className="text-xs text-slate-200 hover:bg-slate-200/10 px-2 py-1 rounded-sm cursor-pointer select-none"
          onClick={copyToClipboard}
        >
          {language}
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        className="syntax-highlighter"
        customStyle={{
          fontSize: "12px",
          height: "300px",
          paddingTop: "24px",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
