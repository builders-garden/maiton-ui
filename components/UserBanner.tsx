import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

type User = {
  displayName: string;
  pfp: string;
};

const MAX_DISPLAY_NAME_LENGTH = 14;

const userBannerVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "text-[30px]",
      md: "text-[38px]",
      lg: "text-[44px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface UserBannerProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof userBannerVariants> {
  user: User;
}

const UserBanner: React.FC<UserBannerProps> = ({
  tw,
  size,
  user,
  ...props
}) => {
  return (
    <div
      tw={cn(
        userBannerVariants({
          size,
          className: tw,
        })
      )}
      {...props}
    >
      <img
        src={`${user.pfp}`}
        alt={`${user.displayName} profile image`}
        tw="w-[78px] h-[78px] rounded-full"
      />
      <p tw="m-0 p-0 ml-[20px]">
        {user.displayName && user.displayName?.length > MAX_DISPLAY_NAME_LENGTH
          ? `${user.displayName.slice(0, 10)}...`
          : user.displayName}
      </p>
    </div>
  );
};

export { UserBanner };
