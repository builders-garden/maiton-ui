import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import React from "react";

const textVariants = cva("m-0", {
  variants: {
    size: {
      default: "text-[40px]",
      sm: "text-[32px]",
      lg: "text-[52px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface TextProps
  extends React.ComponentPropsWithoutRef<"p">,
    VariantProps<typeof textVariants> {}

const Text: React.FC<TextProps> = ({ children, tw, size, ...props }) => {
  return (
    <p tw={cn(textVariants({ size, className: tw }))} {...props}>
      {children}
    </p>
  );
};

export { Text };
export type { TextProps };
