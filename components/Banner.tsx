import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const bannerVariants = cva(
  "absolute",
  {
    variants: {
      position: {
        default: "",
        topRight: "top-0 right-0",
        bottomRight: "bottom-0 right-0",
        topLeft: "top-0 left-0",
        bottomLeft: "bottom-0 left-0",
      },
      size: {
        default: "text-[30px]",
        sm: "text-[20px]",
        lg: "text-[40px]",
      },
    },
    defaultVariants: {
      position: "default",
      size: "default",
    },
  }
)

interface BannerProps extends React.ComponentPropsWithoutRef<"div">, VariantProps<typeof bannerVariants> {}

const Banner: React.FC<BannerProps> = ({ tw, position, size, ...props }) => {
  return (
    <div
      tw={cn(bannerVariants({ position, size, className: tw }))}
      {...props}
    />
  );
};

export { Banner };