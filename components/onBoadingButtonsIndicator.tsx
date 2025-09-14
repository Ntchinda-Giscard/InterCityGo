import { router } from "expo-router";
import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";
import Animated, {
  AnimatedProps,
  FadeInDown,
  FadeInLeft,
  FadeOut,
  FadeOutUp,
  interpolateColor,
  LinearTransition,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedComponent = Animated.createAnimatedComponent(Pressable);
const _spacing = 8;
const _buttonHeight = 42;
const layoutTransition = LinearTransition.springify()
  .damping(30)
  .stiffness(500);
const _dotContainer = 24;
const _dotSize = _dotContainer / 3;
const _inactiveDot = "#7D5FFF";
const _activeDot = "#fff";

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
        typeof style === "function"
          ? style({
              pressed: false,
              hovered: false,
            })
          : style,
      ]}
      entering={FadeInLeft.springify().damping(30).stiffness(500)}
      exiting={FadeOut.springify().damping(30).stiffness(500)}
      layout={layoutTransition}
      {...rest}
    >
      {children}
    </AnimatedComponent>
  );
}

function PaginationIndicator({
  animation,
}: {
  animation: SharedValue<number>;
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      width: _dotContainer + _dotContainer * animation.value,
    };
  });
  return (
    <Animated.View
      style={[
        {
          backgroundColor: "#7D5FFF",
          position: "absolute",
          left: 0,
          top: 0,
          height: _dotContainer,
          width: _dotContainer,
          borderRadius: _dotContainer,
        },
        stylez,
      ]}
    />
  );
}

function Dot({
  index,
  animation,
}: {
  index: number;
  animation: SharedValue<number>;
}) {
  const stylez = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animation.value,
        [index - 1, index, index + 1],
        [_inactiveDot, _activeDot, _activeDot]
      ),
    };
  });
  return (
    <View
      style={{
        width: _dotContainer,
        height: _dotContainer,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={[
          stylez,
          {
            width: _dotSize,
            height: _dotSize,
            borderRadius: _dotSize,
          },
        ]}
      />
    </View>
  );
}
function Pagination({
  activeIndex,
  total,
}: {
  activeIndex: number;
  total: number;
}) {
  const animation = useDerivedValue(() => {
    return withSpring(activeIndex, {
      damping: 20,
      stiffness: 500,
    });
  });
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <PaginationIndicator animation={animation} />
        {[...Array(total).keys()].map((i) => (
          <Dot key={`dot-${i}`} index={i} animation={animation} />
        ))}
      </View>
    </View>
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
    <View className="pb-6">
      <Pagination activeIndex={activeIndex} total={totalSteps} />
      <View
        className="flex-row items-center justify-center w-full gap-4"
        style={{ paddingHorizontal: 30 }}
      >
        {activeIndex > 0 && (
          <Button
            className={"px-4  border border-brand-500 "}
            onPress={() => setActiveIndex(Math.max(0, activeIndex - 1))}
          >
            <Text className="text-brand-500"> Back </Text>
          </Button>
        )}
        <Button
          className={" px-4 flex-1 bg-brand-500"}
          onPress={() => {
            setActiveIndex(Math.min(3, activeIndex + 1));
            activeIndex == totalSteps - 1
              ? router.replace("/(auth)/welcome")
              : null;
          }}
        >
          {activeIndex == totalSteps - 1 ? (
            <Animated.Text
              key={"getstarted"}
              className={"text-white"}
              entering={FadeInDown.springify().damping(30).stiffness(500)}
              exiting={FadeOutUp.springify().damping(30).stiffness(500)}
            >
              {" "}
              Get Started{" "}
            </Animated.Text>
          ) : (
            <Animated.Text
              key={"next"}
              className={"text-white"}
              layout={layoutTransition}
              entering={FadeInDown.springify().damping(30).stiffness(500)}
              exiting={FadeOutUp.springify().damping(30).stiffness(500)}
            >
              {" "}
              Next{" "}
            </Animated.Text>
          )}
        </Button>
      </View>
    </View>
  );
};

export default OnboardingButtonsIndicator;
