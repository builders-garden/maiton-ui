import React from "react";
import { Text, TextProps } from "./Text";

interface AddressProps extends TextProps {
  length?: number;
}

const Address: React.FC<AddressProps> = ({ children, length = 3, ...props }) => {
  const formatAddress = (address: string) => {
    if (typeof address !== 'string') return address;
    if (address.length <= 2 + length * 2) return address;
    return `${address.slice(0, 2 + length)}...${address.slice(-length)}`;
  };

  return (
    <Text {...props}>
      {formatAddress(children as string)}
    </Text>
  );
};

export { Address };
