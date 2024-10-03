import React from "react";
import { Container, ContainerProps } from "./Container";
import { Text, TextProps } from "./Text";
import { cn } from "../lib/utils";

interface TransactionResultProps extends ContainerProps {
  type: "success" | "failed" | "error";
  title?: string;
}

const SuccessIcon = () => (
  <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="70" cy="70" r="70" fill="#004614"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M94.1454 53.0544C95.5513 54.4603 95.5513 56.7397 94.1454 58.1456L65.3454 86.9456C63.9395 88.3515 61.6601 88.3515 60.2542 86.9456L45.8542 72.5456C44.4483 71.1397 44.4483 68.8603 45.8542 67.4544C47.2601 66.0485 49.5395 66.0485 50.9454 67.4544L62.7998 79.3088L89.0542 53.0544C90.4601 51.6485 92.7395 51.6485 94.1454 53.0544Z" fill="#00CA51"/>
  </svg>
);

const FailedIcon = () => (
  <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="70" cy="70" r="70" fill="#440C13"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M49.4548 49.4544C50.8607 48.0486 53.1401 48.0486 54.546 49.4544L70.0004 64.9089L85.4548 49.4544C86.8607 48.0486 89.1401 48.0486 90.546 49.4544C91.9519 50.8603 91.9519 53.1397 90.546 54.5456L75.0916 70L90.546 85.4544C91.9519 86.8603 91.9519 89.1397 90.546 90.5456C89.1401 91.9515 86.8607 91.9515 85.4548 90.5456L70.0004 75.0912L54.546 90.5456C53.1401 91.9515 50.8607 91.9515 49.4548 90.5456C48.0489 89.1397 48.0489 86.8603 49.4548 85.4544L64.9092 70L49.4548 54.5456C48.0489 53.1397 48.0489 50.8603 49.4548 49.4544Z" fill="#F22E41"/>
  </svg>
);

const ErrorIcon = () => (
  <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="70" cy="70" r="70" fill="#502800"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M63.7249 45.1557C66.4775 40.2622 73.523 40.2622 76.2756 45.1557L96.3647 80.8697C99.0644 85.6692 95.5961 91.5995 90.0894 91.5995H49.9112C44.4044 91.5995 40.9361 85.6692 43.6358 80.8697L63.7249 45.1557ZM73.6 80.7999C73.6 82.7882 71.9882 84.4 70 84.4C68.0117 84.4 66.4 82.7882 66.4 80.7999C66.4 78.8117 68.0117 77.2 70 77.2C71.9882 77.2 73.6 78.8117 73.6 80.7999ZM70 52C68.0117 52 66.4 53.6117 66.4 55.6V66.4C66.4 68.3882 68.0117 70 70 70C71.9882 70 73.6 68.3882 73.6 66.4V55.6C73.6 53.6117 71.9882 52 70 52Z" fill="#ED9A00"/>
  </svg>
);

interface TransactionResultProps extends ContainerProps {
  type: "success" | "failed" | "error";
  title?: string;
  titleProps?: TextProps;
  childrenProps?: TextProps;
}

const TransactionResult: React.FC<TransactionResultProps> = ({ 
  type, 
  title, 
  children, 
  titleProps,
  childrenProps,
  ...props 
}) => {
  let icon: React.ReactNode;
  let defaultTitle: string;

  switch (type) {
    case "success":
      icon = <SuccessIcon />;
      defaultTitle = "Success";
      break;
    case "failed":
      icon = <FailedIcon />;
      defaultTitle = "Failed";
      break;
    case "error":
      icon = <ErrorIcon />;
      defaultTitle = "Error";
      break;
  }

  const { tw, ...restProps } = props;
  const { tw: titleTw, ...restTitleProps } = titleProps || {};
  const { tw: childrenTw, ...restChildrenProps } = childrenProps || {};

  return (
    <Container tw={cn("items-center justify-center", tw)} {...restProps}>
      {icon}
      <Text tw={cn("mt-4 mb-2 font-bold text-[72px]", titleTw)} {...restTitleProps}>
        {title || defaultTitle}
      </Text>
      <Text tw={cn("text-center", childrenTw)} {...restChildrenProps}>
        {children}
      </Text>
    </Container>
  );
};

export { TransactionResult };
