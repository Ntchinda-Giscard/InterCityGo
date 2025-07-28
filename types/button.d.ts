interface AppButtonProps {
  title: string;
  onPress: () => void;
  bgVariant?: "primary" | "secondary";
  textVariant?: "primary" | "secondary";
  className?: string;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
}
