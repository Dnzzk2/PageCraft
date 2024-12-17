import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { siteMetadata } from "@/lib/script/metadata";
import { Toaster } from "@/components/ui/toaster";

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full overflow-x-auto">
              <div className="fixed w-full z-[9] header-hight flex items-center px-1 bg-white dark:bg-[#18181b]  border-b border-zinc-200 dark:border-zinc-800">
                <SidebarTrigger />
              </div>
              {children}
              <Toaster />
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
