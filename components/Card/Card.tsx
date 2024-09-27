import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import React from "react";

const cardVariants = cva(
  "flex flex-col w-full rounded-3xl py-[20px] px-[30px]",
  {
    variants: {},
  }
);

interface CardProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof cardVariants> {}

const Card: React.FC<CardProps> = ({ children, tw, ...props }) => {
  return (
    <div tw={cn(cardVariants({ className: tw }))} {...props}>
      {children}
    </div>
  );
};

export { Card };
export type { CardProps };
