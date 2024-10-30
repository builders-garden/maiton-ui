import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bannerVariants = cva("absolute", {
  variants: {
    position: {
      centered: "",
      topRight: "top-0 right-0",
      bottomRight: "bottom-0 right-0",
      topLeft: "top-0 left-0",
      bottomLeft: "bottom-0 left-0",
    },
    size: {
      sm: "text-[20px]",
      md: "text-[30px]",
      lg: "text-[40px]",
    },
  },
  defaultVariants: {
    position: "centered",
    size: "md",
  },
});

interface BannerProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof bannerVariants> {}

const Banner: React.FC<BannerProps> = ({ tw, position, size, ...props }) => {
  return (
    <div
      tw={cn(bannerVariants({ position, size, className: tw }))}
      {...props}
    />
  );
};

export { Banner };
