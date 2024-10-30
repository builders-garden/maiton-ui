import React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("flex flex-col w-full h-full", {
  variants: {
    size: {
      sm: "p-[50px]",
      md: "p-[75px]",
      lg: "p-[100px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface ContainerProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof containerVariants> {}

const Container: React.FC<ContainerProps> = ({
  children,
  tw,
  size,
  ...props
}) => {
  return (
    <div tw={cn(containerVariants({ size, className: tw }))} {...props}>
      {children}
    </div>
  );
};

export { Container };
export type { ContainerProps };
