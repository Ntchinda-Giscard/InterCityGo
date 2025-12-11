import LoginRoute from "@/components/login-route";
import SignupRoute from "@/components/signup-route";
import { images } from "@/constants/images";
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
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const screenHeight = Dimensions.get("window").height;
const { width, height } = Dimensions.get("screen");

const _tab_width = width * 0.8;

const Welcome = () => {
  const [activeTab, setActiveTab] = useState("login");

  // More explicit initial positioning
  const indicatorWidth = 64;
  const tabWidth = _tab_width / 2; // Each tab takes half the container width

  // Start positioned under the login tab (right tab)
  // Position calculation: center of right tab minus half indicator width
  const rightPosition = tabWidth - indicatorWidth / 2;
  const leftPosition = -(tabWidth - indicatorWidth / 2);

  const offset = useSharedValue(rightPosition);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const handlePress = (tab: string) => {
    console.log("Tab pressed:", tab); // Debug log
    console.log("Current offset before change:", offset.value); // Debug log

    setActiveTab(tab);

    if (tab === "signup") {
      // Move to left tab
      offset.value = withSpring(leftPosition, {
        damping: 20,
        stiffness: 300,
      });
    } else {
      // Move to right tab
      offset.value = withSpring(rightPosition, {
        damping: 20,
        stiffness: 300,
      });
    }

    // Debug log after animation start
    setTimeout(() => {
      console.log("Offset after animation:", offset.value);
    }, 100);
  };

  // Debug: Log dimensions
  console.log("Tab width:", _tab_width);
  console.log("Individual tab width:", tabWidth);
  console.log("Left position:", leftPosition);
  console.log("Right position:", rightPosition);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        className="flex-1"
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 10, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 items-center justify-center pt-[20px] px-4">
            <Image source={images.logo} className="w-[80px] h-[80px]" />
            <Text className="text-brand-800 text-2xl font-bold"> CarGo </Text>
            <Text className="text-lg text-brand-800 font-light mt-2">
              Travel smart between cities
            </Text>
            <View className="flex-1 w-full mt-6">
              <View
                className="flex-1 rounded-[24px] mt-4 py-4 bg-brand-100 drop-shadow-xl items-center"
                style={{ boxShadow: " 0px 15px 20px -22px black " }}
              >
                {/* Tab Container */}
                <View
                  className="flex-row relative"
                  style={{
                    width: _tab_width,
                    borderWidth: 1, // Debug border
                    borderColor: "red", // Debug border
                    borderStyle: "dashed", // Debug border
                  }}
                >
                  <View className="flex-row justify-between flex-1">
                    <TouchableOpacity
                      className="flex-1 py-3 items-center"
                      onPress={() => handlePress("signup")}
                      style={{
                        borderWidth: 1, // Debug border
                        borderColor: "blue", // Debug border
                      }}
                    >
                      <Text
                        className={`text-base ${
                          activeTab === "signup"
                            ? "font-semibold text-brand-800"
                            : "text-brand-800/70"
                        }`}
                      >
                        Sign Up
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="flex-1 py-3 items-center"
                      onPress={() => handlePress("login")}
                      style={{
                        borderWidth: 1, // Debug border
                        borderColor: "green", // Debug border
                      }}
                    >
                      <Text
                        className={`text-base ${
                          activeTab === "login"
                            ? "font-semibold text-brand-800"
                            : "text-brand-800/70"
                        }`}
                      >
                        Log In
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Animated Indicator */}
                  <Animated.View
                    className="bg-brand-700 absolute bottom-0"
                    style={[
                      {
                        height: 8,
                        width: indicatorWidth,
                        borderRadius: 20,
                        marginLeft: -indicatorWidth / 2,
                      },
                      animatedStyles,
                    ]}
                  />
                </View>

                {/* Content */}
                <View className="w-full px-4 mt-4">
                  {activeTab === "signup" ? <SignupRoute /> : <LoginRoute />}
                </View>
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
    backgroundColor: "#ffffff",
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
