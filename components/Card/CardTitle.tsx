import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import React from "react";

const cardTitleVariants = cva("my-2", {
  variants: {
    size: {
      default: "text-[48px]",
      sm: "text-[32px]",
      lg: "text-[58px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface CardTitleProps
  extends React.ComponentPropsWithoutRef<"h2">,
    VariantProps<typeof cardTitleVariants> {}

const CardTitle: React.FC<CardTitleProps> = ({
  children,
  tw,
  size,
  ...props
}) => {
  return (
    <h2 tw={cn(cardTitleVariants({ size, className: tw }))} {...props}>
      {children}
    </h2>
  );
};

export { CardTitle };
export type { CardTitleProps };
