import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 首字母转小写
export function lowerFirstLetter(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
