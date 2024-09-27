import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import React from "react";

const cardHeaderVariants = cva("flex flex-col w-full mb-4", {
  variants: {},
});

interface CardHeaderProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof cardHeaderVariants> {}

const CardHeader: React.FC<CardHeaderProps> = ({ children, tw, ...props }) => {
  return (
    <div tw={cn(cardHeaderVariants({ className: tw }))} {...props}>
      {children}
    </div>
  );
};

export { CardHeader };
export type { CardHeaderProps };
