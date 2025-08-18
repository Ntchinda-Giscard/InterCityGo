interface TextInpuProps {
  placeholder: string;
  iconLeft: React.ReactNode;
  iconRight: React.ReactNode;
  className: string;
  onChangeText: (v: string) => string;
  value: string;
}
