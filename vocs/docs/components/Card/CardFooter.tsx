import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const cardFooterVariants = cva("flex flex-col w-full my-4", {
  variants: {},
});

interface CardFooterProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof cardFooterVariants> {}

const CardFooter: React.FC<CardFooterProps> = ({ children, tw, ...props }) => {
  return (
    <div tw={cn(cardFooterVariants({ className: tw }))} {...props}>
      {children}
    </div>
  );
};

export { CardFooter };
export type { CardFooterProps };
