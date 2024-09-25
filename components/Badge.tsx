import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import React from "react";

const badgeVariants = cva("flex justify-center items-center", {
  variants: {
    variant: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-purple-500 text-white",
      outline: "bg-transparent border border-black",
      success: "bg-green-500 text-white",
      error: "bg-red-500 text-white",
      warning: "bg-yellow-500 text-white",
    },
    size: {
      default: "text-[32px] h-[73px] px-8 rounded-[80px]",
      sm: "text-[24px] h-[55px] px-4 rounded-[60px]",
      lg: "text-[40px] h-[90px] px-8 rounded-[100px]",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface BadgeProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof badgeVariants> {}

const Badge: React.FC<BadgeProps> = ({ children, tw, variant, size, ...props }) => {
  return (
    <div tw={cn(badgeVariants({ variant, size, className: tw }))} {...props}>
      {children}
    </div>
  );
};

export { Badge };
