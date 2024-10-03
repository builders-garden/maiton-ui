import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import React from "react";

const columnVariants = cva("flex flex-col", {
  variants: {},
});

interface ColumnProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof columnVariants> {}

const Column: React.FC<ColumnProps> = ({ children, tw, ...props }) => {
  return (
    <div tw={cn(columnVariants({ className: tw }))} {...props}>
      {children}
    </div>
  );
};

export { Column };
export type { ColumnProps };
