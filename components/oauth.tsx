import { images } from "@/constants/images";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const OAuth = () => {
  return (
    <View className="flex-row items-center justify-center mt-4">
      <TouchableOpacity className="flex-row items-center bg-white/30 rounded-full px-4 py-2">
        <Image source={images.google} className="w-6 h-6 mr-2" />
        <Text className="text-white text-base font-normal">Google</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-row items-center bg-white/30 rounded-full px-4 py-2 ml-4">
        <Image source={images.facebook} className="w-6 h-6 mr-2" />
        <Text className="text-white text-base font-normal">Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OAuth;
