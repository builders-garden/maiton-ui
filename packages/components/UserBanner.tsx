import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

type User = {
  displayName: string;
  pfp: string;
};

const MAX_DISPLAY_NAME_LENGTH = 14;

const userBannerVariants = cva("flex absolute items-center", {
  variants: {
    position: {
      topRight: "top-[75px] right-[75px]",
      bottomRight: "bottom-[75px] right-[75px]",
      topLeft: "top-[75px] left-[75px]",
      bottomLeft: "bottom-[75px] left-[75px]",
    },
    size: {
      sm: "text-[20px]",
      md: "text-[30px]",
      lg: "text-[40px]",
    },
  },
  defaultVariants: {
    position: "topLeft",
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
  position,
  size,
  user,
  ...props
}) => {
  return (
    <div
      tw={cn(userBannerVariants({ position, size, className: tw }))}
      {...props}
    >
      <img
        src={`${user.pfp}`}
        alt={`${user.displayName} profile image`}
        tw="w-[78px] h-[78px] rounded-full"
      />
      <p tw="h-[48px] text-[38px] m-0 p-0 ml-[20px]">
        {user.displayName && user.displayName?.length > MAX_DISPLAY_NAME_LENGTH
          ? `${user.displayName.slice(0, 10)}...`
          : user.displayName}
      </p>
    </div>
  );
};

export { UserBanner };
