import CarouselItem from "@/components/carousel-item";
import OnboardingButtonsIndicator from "@/components/onBoadingButtonsIndicator";
import { onboardingSteps } from "@/constants/onboarding";
import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
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
const _circleSize1 = 350;
const _circleSize2 = 300;
const _circleSize3 = 150;

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

  const handleMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
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
  const Circles = ({ scrollX }: { scrollX: Animated.SharedValue<number> }) => {
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
        transform: [
          { rotate: `${rotate}deg` },
          {
            translateX: translateX,
          },
        ],
      };
    });

    return (
      <Animated.View>
        <Animated.View
          style={[
            {
              width: _circleSize1,
              height: _circleSize1,
              borderRadius: _circleSize1,
              backgroundColor: "transparent",
              borderBottomEndRadius: _circleSize1,
              borderBottomStartRadius: _circleSize1,
              borderWidth: 10,
              borderColor: "purple",
              // top: 100,
              top: -10,
              left: -width * 0.3,
              position: "absolute",
              zIndex: 9,
            },
            animatedStyle,
          ]}
        />

        <Animated.View
          style={[
            {
              width: _circleSize2,
              height: _circleSize2,
              borderRadius: _circleSize2,
              backgroundColor: "transparent",
              borderBottomEndRadius: _circleSize2,
              borderBottomStartRadius: _circleSize2,
              borderWidth: 20,
              borderColor: "purple",
              // top: 100,
              top: 200,
              left: -width * 0.6,
              position: "absolute",
            },
            animatedStyle,
          ]}
        />

        <Animated.View
          style={[
            {
              width: _circleSize3,
              height: _circleSize3,
              borderRadius: _circleSize3,
              backgroundColor: "transparent",
              borderBottomEndRadius: _circleSize3,
              borderBottomStartRadius: _circleSize3,
              borderWidth: 15,
              borderColor: "purple",
              // top: 100,
              top: 50,
              left: -width * 0.5,
              position: "absolute",
            },
            animatedStyle,
          ]}
        />
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background effects */}
      {/* <BackDrop scrollX={scrollX} /> */}
      <Circles scrollX={scrollX} />

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
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={(props) => <CarouselItem scrollX={scrollX} {...props} />}
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
        setActiveIndex={handleIndexChange}
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
