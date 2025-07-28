import React from "react";
import { Text, TouchableOpacity } from "react-native";

const getButtonVariant = (variant: string) => {
  switch (variant) {
    case "light":
      return "bg-white";
    case "secondary":
      return "bg-secondary";
    default:
      return "bg-primary";
  }
};

const getTextColorVariant = (variant: string) => {
  switch (variant) {
    case "primary":
      return "text-primary";
    case "secondary":
      return "text-secondary";
    default:
      return "text-primary";
  }
};

const AppButton = ({
  title,
  onPress,
  variant = "default",
  className,
  iconRight,
  iconLeft,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={` w-full flex-row rounded-full py-2 justify-center items-center ${getButtonVariant(variant)} ${getTextColorVariant(variant)} ${className}`}
    >
      {iconLeft && iconLeft}
      <Text>{title}</Text>
      {iconRight && iconRight}
    </TouchableOpacity>
  );
};

export default AppButton;
