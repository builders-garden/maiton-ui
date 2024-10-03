/* eslint-disable @next/next/no-img-element */
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import React from "react";

const backgroundImageVariants = cva("flex", {
  variants: {
    container: {
      relative: "flex-col relative",
      absolute: "absolute top-0 left-0",
    },
  },
  defaultVariants: {},
});

interface BackgroundImageProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof backgroundImageVariants> {
  src?: string;
  width?: string;
  height?: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  src,
  children,
  tw,
  width = "955px",
  height = "500px",
  ...props
}) => {
  if (!src) {
    return (
      <div
        tw={
          (cn(backgroundImageVariants({ className: tw })),
          `w-[${width}] h-[${height}]`)
        }
        {...props}
      >
        {children}
      </div>
    );
  }
  if (!width.endsWith("px") || !height.endsWith("px")) {
    width = `${width}px`;
    height = `${height}px`;
  }

  return (
    <div
      tw={cn(
        backgroundImageVariants({
          className: tw,
          container: "relative",
        })
      )}
      {...props}
    >
      <img
        tw={cn(
          "w-full",
          backgroundImageVariants({
            className: tw,
          })
        )}
        {...props}
        src={src}
        alt={"background image"}
      />
      <div
        tw={cn(
          backgroundImageVariants({
            className: tw,
            container: "absolute",
          }),
          `w-[${width}] h-[${height}]`
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export { BackgroundImage };
export type { BackgroundImageProps };
