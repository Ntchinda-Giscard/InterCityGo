import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import Animated, {
  AnimatedProps,
  FadeInLeft,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

const AnimatedComponent = Animated.createAnimatedComponent(Pressable);
const _spacing = 8;
const _buttonHeight = 42;
const layoutTransition = LinearTransition.springify()
  .damping(30)
  .stiffness(500);

function Button({
  children,
  style,
  className,
  ...rest
}: AnimatedProps<PressableProps>) {
  return (
    <AnimatedComponent
      className={className}
      style={[
        {
          height: _buttonHeight,
          borderRadius: _buttonHeight / 2,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
      entering={FadeInLeft.springify().damping(30).stiffness(500)}
      exiting={FadeOut.springify().damping(30).stiffness(500)}
      layout={layoutTransition}
      {...rest}
    >
      {typeof children === "function"
        ? (state: any) => (children as (state: any) => React.ReactNode)(state)
        : children}
    </AnimatedComponent>
  );
}

const OnboardingButtonsIndicator = ({
  activeIndex,
  setActiveIndex,
  totalSteps,
}: {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  totalSteps: number;
}) => {
  return (
    <View
      className="flex-row items-center justify-center w-full gap-4"
      style={{ paddingHorizontal: 30 }}
    >
      {activeIndex > 0 && (
        <Button
          className={"bg-white/50 border border-white px-4"}
          onPress={() => setActiveIndex(Math.max(0, activeIndex - 1))}
        >
          <Text> Back </Text>
        </Button>
      )}
      <Button
        className={"bg-white px-4 flex-1"}
        onPress={() => setActiveIndex(Math.min(2, activeIndex + 1))}
      >
        {activeIndex == totalSteps - 1 ? (
          <Animated.Text> Get Started </Animated.Text>
        ) : (
          <Animated.Text layout={layoutTransition}> Next </Animated.Text>
        )}
      </Button>
    </View>
  );
};

export default OnboardingButtonsIndicator;
