import React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

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

const cardContentVariants = cva("flex flex-col w-full my-4", {
  variants: {},
});

interface CardContentProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof cardContentVariants> {}

const CardContent: React.FC<CardContentProps> = ({
  children,
  tw,
  ...props
}) => {
  return (
    <div tw={cn(cardContentVariants({ className: tw }))} {...props}>
      {children}
    </div>
  );
};

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

export { Card, CardContent, CardHeader, CardTitle };
export type { CardProps, CardContentProps, CardHeaderProps, CardTitleProps };
