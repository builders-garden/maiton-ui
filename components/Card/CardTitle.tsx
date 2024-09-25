import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import React from "react";

const cardTitleVariants = cva("my-2", {
  variants: {
    size: {
      default: "text-[48px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface CardTitleProps
  extends React.ComponentPropsWithoutRef<"h2">,
    VariantProps<typeof cardTitleVariants> {}

const CardTitle: React.FC<CardTitleProps> = ({ children, tw, ...props }) => {
  return (
    <h2 tw={cn(cardTitleVariants({ className: tw }))} {...props}>
      {children}
    </h2>
  );
};

export { CardTitle };
export type { CardTitleProps };
