import { useState } from "react";

export function useChange(delay: number = 300) {
  const [isChanging, setIsChanging] = useState(false);

  const changeStatus = (func: (value: any) => void, value: any) => {
    setIsChanging(true);
    setTimeout(() => {
      func(value);
      setIsChanging(false);
    }, delay);
  };

  return { isChanging, changeStatus };
}
