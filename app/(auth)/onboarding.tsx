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
        onIndexChanged={(index) => setCurrentIndex(index)}
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
      <AppButton
        variant="light"
        title="Next"
        onPress={() => {}}
        iconRight={
          <MaterialCommunityIcons name="arrow-right" color="#fff" size={18} />
        }
      />
    </SafeAreaView>
  );
};

export default OnBoarding;
