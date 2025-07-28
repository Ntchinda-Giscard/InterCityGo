interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: "light" | "default";
  className?: string;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
}
