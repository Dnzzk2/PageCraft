import { useState, useCallback, useRef } from "react";

interface UseChangeOptions {
  delay?: number; // 防抖延迟时间
  loadingDelay?: number; // loading显示时间
}

export function useChange<T = any>(options: UseChangeOptions = {}) {
  const {
    delay = 800, // 默认防抖 800ms
    loadingDelay = 300, // 默认loading 300ms
  } = options;
  const [isChanging, setIsChanging] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  const changeStatus = useCallback(
    (func: (value: T) => void, value: T) => {
      setIsChanging(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // 如果是布尔值，直接执行，不需要防抖
      if (typeof value === "boolean") {
        func(value);
        setTimeout(() => setIsChanging(false), loadingDelay);
        return;
      }

      // 其他类型使用防抖
      timerRef.current = setTimeout(() => {
        func(value);
        setIsChanging(false);
      }, delay);
    },
    [delay, loadingDelay]
  );

  return { isChanging, changeStatus };
}
