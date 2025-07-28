import AppButton from "@/components/app-button";
import { onboardingSteps } from "@/constants/onboarding";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const OnBoarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLastIndex, setIsLastIndex] = useState(false);
  const handleNext = () => {
    if (currentIndex === onboardingSteps.length - 1) {
      setIsLastIndex(true);
      router.replace("/(auth)/login");
    } else {
      swiperRef.current?.scrollBy(1);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-primary to-secondary">
      {/* Top bar */}
      <View className="flex-row w-full justify-end px-4">
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/login")}
          className="flex-row items-center"
        >
          <Text className="text-white text-md font-bold">Skip</Text>
          <MaterialCommunityIcons name="arrow-right" color="#fff" size={18} />
        </TouchableOpacity>
      </View>

      {/* Onboarding content */}
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="bg-white/50 w-[8px] h-[8px] rounded-full" />}
        activeDot={<View className="bg-white w-[16px] h-[8px] rounded-full" />}
        onIndexChanged={(index) => {
          setCurrentIndex(index);
          setIsLastIndex(index === onboardingSteps.length - 1);
        }}
      >
        {onboardingSteps.map((step) => (
          <View key={step.id} className="justify-center items-center w-full">
            <Image source={step.image} className="w-full h-[300px]" />
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
          className="w-1/3 my-6"
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
