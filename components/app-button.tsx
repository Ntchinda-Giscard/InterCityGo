import React from "react";
import { Text, TouchableOpacity } from "react-native";

const getButtonVariant = (variant: string) => {};

const getTextColorVariant = (variant: string) => {};

const AppButton = ({
  title,
  onPress,
  bgVariant = "primary",
  textVariant = "primary",
  className,
  iconRight,
  iconLeft,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={` w-full flex-row rounded-full py-2 justify-center items-center ${getButtonVariant(bgVariant)} ${getTextColorVariant(textVariant)} ${className}`}
    >
      {iconLeft && iconLeft}
      <Text>{title}</Text>
      {iconRight && iconRight}
    </TouchableOpacity>
  );
};

export default AppButton;
