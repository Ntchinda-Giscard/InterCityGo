import AppButton from "@/components/app-button";
import { onboardingSteps } from "@/constants/onboarding";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const OnBoarding = () => {
  const activePaginationWidth = useSharedValue<number>(16);
  const inactivePaginationWidth = useSharedValue<number>(8);
  const swiperRef = useRef<Swiper>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLastIndex, setIsLastIndex] = useState(false);

  const handleNext = () => {
    if (currentIndex === onboardingSteps.length - 1) {
      setIsLastIndex(true);
      router.replace("/(auth)/welcome");
    } else {
      console.log("On boarding next step", onboardingSteps.length - 1);
      swiperRef.current?.scrollBy(1);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#3B82F6", "#9333EA"]}
        style={styles.background}
      />
      {/* Top bar */}
      <View className="flex-row w-full justify-end px-4">
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/welcome")}
          className="flex-row items-center p-2 rounded-full bg-white/20"
        >
          <Text className="text-white text-md font-bold">Skip</Text>
          <MaterialCommunityIcons name="arrow-right" color="#fff" size={18} />
        </TouchableOpacity>
      </View>

      {/* Onboarding content */}
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={true}
        dot={
          <View
            style={{ width: 8, height: 8 }}
            className={"bg-white/50 rounded-full mx-1 my-4"}
          />
        }
        activeDot={
          <View
            style={{ width: 16, height: 8 }}
            className={"bg-white rounded-full mx-1 my-4"}
          />
        }
        onIndexChanged={(index) => {
          console.log("Current index:", index);
          setCurrentIndex(index);
          setIsLastIndex(index === onboardingSteps.length - 1);
        }}
      >
        {onboardingSteps.map((step) => (
          <View key={step.id} className="justify-center items-center w-full">
            <Image source={step.image} className="w-full h-[350px]" />
            <View className="px-[32px] gap-[16px]">
              <Text className="text-white text-2xl font-bold text-center">
                {step.title}
              </Text>
              <Text className="text-white/80 text-md font-normal text-center">
                {step.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>

      <View className="flex-row justify-center">
        <AppButton
          variant="light"
          title={isLastIndex ? "Get Started" : "Next"}
          className="w-1/3 mb-[100px]"
          onPress={handleNext}
          iconRight={
            <MaterialCommunityIcons name="arrow-right" color="#fff" size={18} />
          }
        />
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
    backgroundColor: "#9333EA",
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
