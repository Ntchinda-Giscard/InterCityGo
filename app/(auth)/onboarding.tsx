import { onboardingSteps } from "@/constants/onboarding";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Flatlist */}
      <BackDrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        pagingEnabled
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100 }}
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
      <Pressable className="p-4 bg-white rounded-full ">
        <Text> Just do it </Text>
      </Pressable>
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
