import LoginRoute from "@/components/login-route";
import SignupRoute from "@/components/signup-route";
import { images } from "@/constants/images";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const screenHeight = Dimensions.get("window").height;

const Welcome = () => {
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#3B82F6", "#9333EA"]}
        style={styles.background}
      />
      <KeyboardAvoidingView
        className="flex-1"
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS lifts, Android shrinks
        keyboardVerticalOffset={10} // adjust if you have a header
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 10, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="  flex-1  items-center justify-center pt-[20px] px-4 ">
            <Image source={images.logo} className="w-[80px] h-[80px]" />
            <Text className="text-white text-2xl font-bold"> InterCityGo </Text>
            <Text className="text-white text-lg font-light mt-2">
              Travel smart between cities
            </Text>
            <View className="flex-1 w-full mt-6">
              <View className="bg-white/20 flex-1 rounded-[24px] mt-4 py-4">
                <View className="flex-row mb-8 px-4">
                  <TouchableOpacity
                    className={`flex-1 py-3 items-center ${
                      activeTab === "signup" ? "border-b-2 border-white" : ""
                    }`}
                    onPress={() => setActiveTab("signup")}
                  >
                    <Text
                      className={`text-base ${
                        activeTab === "signup"
                          ? "text-white font-semibold"
                          : "text-white/70"
                      }`}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`flex-1 py-3 items-center ${
                      activeTab === "login" ? "border-b-2 border-white" : ""
                    }`}
                    onPress={() => setActiveTab("login")}
                  >
                    <Text
                      className={`text-base ${
                        activeTab === "login"
                          ? "text-white font-semibold"
                          : "text-white/70"
                      }`}
                    >
                      Log In
                    </Text>
                  </TouchableOpacity>
                </View>
                {activeTab === "signup" ? <SignupRoute /> : <LoginRoute />}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9333EA",
    minHeight: screenHeight,
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
