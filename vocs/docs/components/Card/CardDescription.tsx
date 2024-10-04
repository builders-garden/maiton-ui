import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const cardDescriptionVariants = cva("my-0", {
  variants: {
    size: {
      default: "text-[32px]",
      sm: "text-[20px]",
      lg: "text-[40px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface CardDescriptionProps
  extends React.ComponentPropsWithoutRef<"p">,
    VariantProps<typeof cardDescriptionVariants> {}

const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  size,
  tw,
  ...props
}) => {
  return (
    <p tw={cn(cardDescriptionVariants({ size, className: tw }))} {...props}>
      {children}
    </p>
  );
};

export { CardDescription };
export type { CardDescriptionProps };
