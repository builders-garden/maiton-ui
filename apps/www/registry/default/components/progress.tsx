import React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const progressVariants = cva("flex flex-row w-full rounded-full", {
  variants: {
    size: {
      default: "h-[30px]",
      sm: "h-[5px]",
      lg: "h-[15px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface ProgressProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof progressVariants> {
  bgIndicator?: string;
  bg?: string;
  value: number;
}

const Progress: React.FC<ProgressProps> = ({ tw, size, ...props }) => {
  // create a div that simulates the progress bar
  return (
    <div
      tw={cn(
        progressVariants({
          size,
          className:
            tw +
            ` ${
              props.bg
                ? props.bg?.startsWith("#")
                  ? `bg-[${props.bg}]`
                  : props.bg
                : "bg-zinc-500"
            }`,
        })
      )}
      {...props}
    >
      {/* instead of full rounded corners I would like to have only left rounded corners */}
      <div
        tw={`flex ${
          props.bgIndicator
            ? props.bgIndicator?.startsWith("#")
              ? `bg-[${props.bgIndicator}]`
              : props.bgIndicator
            : "bg-zinc-300"
        } w-[${props.value > 100 ? 100 : props.value}%] h-full rounded-l-full`}
      ></div>
    </div>
  );
};

export { Progress };
export type { ProgressProps };
