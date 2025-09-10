import OnboardingButtonsIndicator from "@/components/onBoadingButtonsIndicator";
import { onboardingSteps } from "@/constants/onboarding";
import React, { useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  FadeInLeft,
  FadeOutRight,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");

const OnBoarding = () => {
  const flatListRef = useRef<Animated.FlatList<any>>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const scrollX = useSharedValue<number>(0);
  const _background = ["#3B82F6", "#a855f7", "#7a22ce"];

  const onScroll = useAnimatedScrollHandler({
    onScroll: (ev) => {
      scrollX.value = ev.contentOffset.x;
    },
  });

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
      });
    }
  };

  // Backdrop animated background
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

  // Rotating square animation
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
      {/* Background effects */}
      {/* <BackDrop scrollX={scrollX} />
      <Square scrollX={scrollX} /> */}

      {/* Main onboarding flatlist */}
      <Animated.FlatList
        ref={flatListRef}
        data={onboardingSteps}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id.toString()}
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: width,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 0.85,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: width,
                    height: height,
                    resizeMode: "contain",
                  }}
                />
              </View>
            </View>
          );
        }}
      />

      {/* Animated title and description */}
      <View style={{ flex: 0.3, paddingHorizontal: 30 }}>
        {/* Key must depend on activeIndex so it unmounts/remounts */}
        <Animated.Text
          key={`title-${activeIndex}`}
          entering={FadeInLeft.springify().damping(20).stiffness(200)}
          exiting={FadeOutRight.springify().damping(20).stiffness(200)}
          className="font-bold text-2xl text-center text-brand-800"
        >
          {onboardingSteps[activeIndex].title}
        </Animated.Text>

        <Animated.Text
          key={`desc-${activeIndex}`}
          entering={FadeInLeft.springify().damping(20).stiffness(200)}
          exiting={FadeOutRight.springify().damping(20).stiffness(200)}
          className="text-center mt-2 text-brand-800"
        >
          {onboardingSteps[activeIndex].description}
        </Animated.Text>
      </View>

      {/* Indicator buttons */}
      <OnboardingButtonsIndicator
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        totalSteps={onboardingSteps.length}
      />
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
