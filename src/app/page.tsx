import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex">
        {/* 左侧配置面板 */}
        <div className="w-[300px] border-r border-border">
          <div className="p-4 space-y-4">
            <h2 className="font-semibold">配置面板</h2>
            {/* 后续添加配置内容 */}
          </div>
        </div>

        {/* 中间预览区 */}
        <div className="flex-1">
          <div className="h-full p-4">
            <div className="h-full border rounded-lg flex items-center justify-center">
              预览区域
            </div>
          </div>
        </div>

        {/* 右侧代码区 */}
        <div className="w-[400px] border-l border-border">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <h2 className="font-semibold">生成代码</h2>
            </div>
            <div className="flex-1 p-4 font-mono text-sm bg-muted/50">
              // 代码预览
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
