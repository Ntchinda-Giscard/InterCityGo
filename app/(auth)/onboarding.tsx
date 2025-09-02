import { onboardingSteps } from "@/constants/onboarding";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  AnimatedProps,
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");

const AnimatedComponent = Animated.createAnimatedComponent(Pressable);

const _spacing = 8;
const _buttonHeight = 42;

const OnBoarding = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollX = useSharedValue<number>(0);
  const _background = ["#3B82F6", "#a855f7", "#7a22ce"];

  const onScroll = useAnimatedScrollHandler({
    onScroll: (ev) => {
      scrollX.value = ev.contentOffset.x;
    },
  });

  const BackDrop = ({ scrollX }: { scrollX: Animated.SharedValue<number> }) => {
    const backgroundColor = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          scrollX.value,
          [0, width, width * 2],
          _background
        ),
      };
    });

    return (
      <Animated.View style={[StyleSheet.absoluteFillObject, backgroundColor]} />
    );
  };

  const Square = ({ scrollX }: { scrollX: Animated.SharedValue<number> }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const pageProgress = (scrollX.value % width) / width;

      const rotate = interpolate(pageProgress, [0, 0.5, 1], [35, 10, 35]);
      const translateX = interpolate(
        pageProgress,
        [0, 0.5, 1],
        [0, -width / 2, 0],
        Extrapolation.CLAMP
      );

      return {
        transform: [{ rotate: `${rotate}deg` }, { translateX }],
      };
    });

    return (
      <Animated.View
        style={[
          {
            width: height,
            height: height,
            borderRadius: 150,
            backgroundColor: "white",
            top: -height * 0.6,
            left: -height * 0.3,
            position: "absolute",
          },
          animatedStyle,
        ]}
      />
    );
  };

  function Button({
    children,
    style,
    className,
    ...rest
  }: AnimatedProps<PressableProps>) {
    return (
      <AnimatedComponent className={className} style={style} {...rest}>
        {typeof children === "function"
          ? (state: any) => (children as (state: any) => React.ReactNode)(state)
          : children}
      </AnimatedComponent>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Flatlist */}
      <BackDrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        pagingEnabled
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 50 }}
        keyExtractor={(item) => item.id}
        data={onboardingSteps}
        onScroll={onScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: width,
                alignItems: "center",
              }}
            >
              <View style={{ flex: 0.7, justifyContent: "center" }}>
                <Image
                  source={item.image}
                  style={{
                    width: width / 2,
                    height: height / 2,
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text className="font-bold text-2xl text-center text-white">
                  {" "}
                  {item.title}
                </Text>
                <Text className="text-center mt-2 text-white">
                  {" "}
                  {item.description}{" "}
                </Text>
              </View>
            </View>
          );
        }}
      />

      {/* Indicator */}
      {/* <Indicator scrollX={scrollX} /> */}
      <View className="flex-row items-center justify-center w-full">
        <Button onPress={() => setActiveIndex(Math.max(0, activeIndex - 1))}>
          <Text> Back </Text>
        </Button>
        <Button onPress={() => setActiveIndex(Math.min(2, activeIndex + 1))}>
          {activeIndex == 2 ? <Text> Get Started </Text> : <Text> Next </Text>}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
