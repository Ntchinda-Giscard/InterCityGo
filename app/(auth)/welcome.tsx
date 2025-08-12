import { images } from "@/constants/images";
import { LinearGradient } from "expo-linear-gradient";
import React, { useReducer } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

const Welcome = () => {
  const [isToggled, toggle] = useReducer((s) => !s, false);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#3B82F6", "#9333EA"]}
        style={styles.background}
      />
      <View className=" w-full items-center justify-center pt-[20px] ">
        <Image source={images.logo} className="w-[80px] h-[80px]" />
        <Text className="text-white text-2xl font-bold"> InterCityGo </Text>
        <Text className="text-white text-lg font-light mt-2">
          Travel smart between cities
        </Text>
        <View className="bg-white/20 rounded-[24px] w-full mt-4 px-4 py-6"></View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
