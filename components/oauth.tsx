import { images } from "@/constants/images";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const OAuth = () => {
  const handleGoogleSignIn = async () => {
    // Implement Google Sign-In logic here
  };
  const handleFacebookSignIn = async () => {
    // Implement Facebook Sign-In logic here
  };
  return (
    <View className="flex-row items-center justify-center mt-4">
      <TouchableOpacity
        onPress={handleGoogleSignIn}
        className="flex-row items-center  justify-center w-full bg-white/30 rounded-xl px-6 py-4"
      >
        <Image source={images.google} className="w-7 h-7 mr-2" />
        <Text className="text-white text-xl font-semibold">Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OAuth;
