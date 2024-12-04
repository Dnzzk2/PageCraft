import { Loader2 } from "lucide-react";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  loading: boolean;
}>;

const LoadingOverlay = (props: Props) => {
  const { loading, children } = props;
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {children}
    </div>
  );
};

export default LoadingOverlay;
