import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

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

export { CardContent };
export type { CardContentProps };
