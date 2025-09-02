import { onboardingSteps } from "@/constants/onboarding";
import React, { useRef } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("screen");

const OnBoarding = () => {
  const activePaginationWidth = useSharedValue<number>(16);
  const inactivePaginationWidth = useSharedValue<number>(8);
  const swiperRef = useRef<Swiper>(null);

  const _background = ["#3B82F6", "#9333EA", "#a855f7"];
  return (
    <SafeAreaView style={styles.container}>
      {/* Flatlist */}
      <Animated.FlatList
        keyExtractor={(item) => item.id}
        data={onboardingSteps}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ width: width, justifyContent: "center" }}>
              <Image
                source={item.image}
                style={{
                  width: width / 2,
                  height: height / 2,
                  resizeMode: "contain",
                }}
              />
            </View>
          );
        }}
      />

      {/* Onboarding content */}
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
  background: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
