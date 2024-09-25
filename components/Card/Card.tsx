import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import React from "react";

const cardVariants = cva("flex flex-col w-full rounded-3xl", {
  variants: {
    size: {
      default: "py-[20px] px-[30px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface CardProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof cardVariants> {}

const Card: React.FC<CardProps> = ({ children, tw, size, ...props }) => {
  return (
    <div tw={cn(cardVariants({ size, className: tw }))} {...props}>
      {children}
    </div>
  );
};

export { Card };
export type { CardProps };
