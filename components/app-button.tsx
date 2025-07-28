import React from "react";
import { Text, TouchableOpacity } from "react-native";

const getButtonVariant = (variant: string) => {
  switch (variant) {
    case "light":
      return "bg-white/20 border-white/30 border-[1px]";
    case "default":
      return "bg-primary";
    default:
      return "bg-primary";
  }
};

const getTextColorVariant = (variant: string) => {
  switch (variant) {
    case "light":
      return "text-white";
    case "default":
      return "text-white";
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
      className={`flex-row rounded-full py-2 justify-center items-center ${getButtonVariant(variant)} ${className}`}
    >
      {iconLeft && iconLeft}
      <Text className={` text-sm ${getTextColorVariant(variant)}`}>
        {title}
      </Text>
      {iconRight && iconRight}
    </TouchableOpacity>
  );
};

export default AppButton;
