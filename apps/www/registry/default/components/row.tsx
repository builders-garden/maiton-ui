import React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const rowVariants = cva("flex flex-row", {
  variants: {},
});

interface RowProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof rowVariants> {}

const Row: React.FC<RowProps> = ({ children, tw, ...props }) => {
  return (
    <div tw={cn(rowVariants({ className: tw }))} {...props}>
      {children}
    </div>
  );
};

export { Row };
export type { RowProps };
