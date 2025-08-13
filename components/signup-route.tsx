import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import OAuth from "./oauth";

const SignupRoute = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email_phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };
  return (
    <View className="px-4">
      <TextInput
        cursorColor={"white"}
        className="bg-white/20 rounded-xl px-4 py-4 mb-4 text-base text-white min-h-[56px]"
        placeholder="Full Name"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={formData.fullName}
        onChangeText={(value) => handleInputChange("fullName", value)}
      />

      <TextInput
        cursorColor={"white"}
        className="bg-white/20 rounded-xl px-4 py-4 mb-4 text-base text-white min-h-[56px]"
        placeholder="Phone Number / Email"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={formData.email_phone}
        onChangeText={(value) => handleInputChange("email_phone", value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        cursorColor={"white"}
        className="bg-white/20 rounded-xl px-4 py-4 mb-4 text-base text-white min-h-[56px]"
        placeholder="Password"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={formData.password}
        onChangeText={(value) => handleInputChange("password", value)}
        secureTextEntry
      />
      <TextInput
        cursorColor={"white"}
        className="bg-white/20 rounded-xl px-4 py-4 mb-4 text-base text-white min-h-[56px]"
        placeholder="Confirm Password"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={formData.confirmPassword}
        onChangeText={(value) => handleInputChange("confirmPassword", value)}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => router.push("/otp-screen")}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
          colors={["#3B82F6", "#4F46E5"]}
        >
          <Text className="text-white text-base font-semibold"> Sign up </Text>
        </LinearGradient>
      </TouchableOpacity>
      <View className="flex-row items-center w-full mt-5 gap-4">
        <View className="h-[1px] bg-white/50 rounded-full flex-1 mx-1" />
        <Text className="text-white/50 font-normal">or continue with</Text>
        <View className="h-[1px] bg-white/50 rounded-full flex-1 mx-1" />
      </View>
      <OAuth />
      {/* <View className="flex-row items-center justify-center mt-4">
        <TouchableOpacity className="flex-row items-center bg-white/30 rounded-full px-4 py-2">
          <Image source={images.google} className="w-6 h-6 mr-2" />
          <Text className="text-white text-base font-normal">Google</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-white/30 rounded-full px-4 py-2 ml-4">
          <Image source={images.facebook} className="w-6 h-6 mr-2" />
          <Text className="text-white text-base font-normal">Facebook</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default SignupRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9333EA",
  },
  gradient: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 12,
    padding: 16,
  },
});
