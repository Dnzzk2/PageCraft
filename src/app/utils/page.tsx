"use client";

import { useState, useMemo, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CodeBlock from "@/components/shared/CodeBlock";
import { Backpack, CornerDownLeft, Search } from "lucide-react";
import { UTILS_CODE, UtilCode } from "./data";
import { Skeleton } from "@/components/ui/skeleton";
import { useChange } from "@/lib/hooks/useChange";

// 搜索和分类区域组件
const SearchAndCategories = memo(
  ({
    searchInput,
    selectedCategory,
    categories,
    isLoading,
    onSearchChange,
    onSearchSubmit,
    onCategoryChange,
  }: {
    searchInput: string;
    selectedCategory: string;
    categories: string[];
    isLoading: boolean;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onCategoryChange: (category: string) => void;
  }) => (
    <div className="sticky top-0 z-10 backdrop-blur-sm pb-4">
      <div className="relative max-w-2xl mx-auto w-full mb-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          <CornerDownLeft className="h-5 w-5" />
        </span>
        <Input
          placeholder="搜索工具函数"
          value={searchInput}
          onChange={onSearchChange}
          onKeyDown={onSearchSubmit}
          className="pl-12 pr-10 h-12 bg-white dark:bg-zinc-900/50"
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            className={`cursor-pointer text-sm px-4 py-1.5 hover:opacity-80 transition-all ${
              isLoading && selectedCategory === category ? "animate-pulse" : ""
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  )
);

// 工具卡片组件
const UtilCard = memo(({ item }: { item: UtilCode }) => (
  <Card className="rounded-lg shadow dark:bg-zinc-900/50 h-full backdrop-blur-sm">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg">{item.title}</CardTitle>
        <Badge variant="secondary" className="text-xs">
          {item.category}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
    </CardHeader>
    <CardContent>
      <CodeBlock
        language="jsx"
        code={item.code}
        customStyle={{ maxHeight: "200px" }}
      />
    </CardContent>
  </Card>
));

// 加载骨架屏组件
const LoadingSkeleton = memo(() => (
  <Card className="rounded-lg shadow dark:bg-zinc-900/50 h-full backdrop-blur-sm">
    <CardHeader>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-4 w-full mt-2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[200px] w-full" />
    </CardContent>
  </Card>
));

// 工具列表组件
const UtilsList = memo(
  ({
    isLoading,
    filteredUtils,
  }: {
    isLoading: boolean;
    filteredUtils: UtilCode[];
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {isLoading
        ? Array(4)
            .fill(0)
            .map((_, index) => <LoadingSkeleton key={index} />)
        : filteredUtils.map((item, index) => (
            <UtilCard key={item.title} item={item} />
          ))}
    </div>
  )
);

export default function Utils() {
  const [searchInput, setSearchInput] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const { isChanging, changeStatus } = useChange({ delay: 300 });

  // 缓存分类列表
  const categories = useMemo(
    () => [
      "全部",
      ...Array.from(new Set(UTILS_CODE.map((item) => item.category))),
    ],
    []
  );

  // 缓存过滤后的工具列表
  const filteredUtils = useMemo(
    () =>
      UTILS_CODE.filter(
        (item) =>
          (item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(searchValue.toLowerCase())) &&
          (selectedCategory === "全部"
            ? true
            : item.category === selectedCategory)
      ),
    [searchValue, selectedCategory]
  );

  // 处理分类切换
  const handleCategoryChange = (category: string) => {
    changeStatus(setSelectedCategory, category);
  };

  // 处理搜索输入 - 直接更新输入值
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // 处理搜索提交
  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      changeStatus(setSearchValue, searchInput);
    }
  };

  return (
    <div className="main-container">
      <div className="flex flex-col space-y-6 py-6">
        <SearchAndCategories
          searchInput={searchInput}
          selectedCategory={selectedCategory}
          categories={categories}
          isLoading={isChanging}
          onSearchChange={handleSearchInput}
          onSearchSubmit={handleSearchSubmit}
          onCategoryChange={handleCategoryChange}
        />

        <UtilsList isLoading={isChanging} filteredUtils={filteredUtils} />

        {!isChanging && filteredUtils.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            没有找到匹配的工具函数
          </div>
        )}
      </div>
    </div>
  );
}
