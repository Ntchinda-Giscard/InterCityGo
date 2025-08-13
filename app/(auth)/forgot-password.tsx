import { images } from "@/constants/images";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email_phone: "",
  });
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#3B82F6", "#9333EA"]}
        style={styles.background}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS lifts, Android shrinks
        style={{ flex: 1 }}
        keyboardVerticalOffset={10} // adjust if you have a header
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 10, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className=" flex-1  items-center justify-center pt-[20px] ">
            <Image source={images.logo} className="w-[80px] h-[80px]" />
            <Text className="text-white text-2xl font-bold"> InterCityGo </Text>
            <Text className="text-white text-lg font-light mt-2">
              Travel smart between cities
            </Text>
            <View className="flex-1 mt-6 px-4">
              <View className="bg-white/20 flex-1 rounded-[24px]  mt-4 px-3 py-4">
                <Text className="text-white text-xl font-bold text-center">
                  {" "}
                  Forgot Password{" "}
                </Text>
                <Text className="text-white text-md font-light mt-2 text-center">
                  Enter the email address associated with your account
                </Text>
                <TextInput
                  className="bg-white/20 rounded-xl px-4 py-4 mb-4 mt-6 text-base text-white w-full min-h-[56px]"
                  placeholder="Phone Number / Email"
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  value={formData.email_phone}
                  onChangeText={(value) =>
                    handleInputChange("email_phone", value)
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <TouchableOpacity className="mt-4">
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                    colors={["#3B82F6", "#4F46E5"]}
                  >
                    <Text className="text-white text-base font-semibold">
                      {" "}
                      Send Reset Link{" "}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <Text className="text-white/50 font-normal text-center mt-4 mb-4">
                  We will send you an email with instructions to reset your
                  password.
                </Text>
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="flex-row items-center gap-5 justify-center mt-4"
                >
                  <MaterialCommunityIcons
                    name="arrow-left"
                    color="#fff"
                    size={20}
                  />
                  <Text className="text-white/50 font-normal text-center mt-4 mb-4">
                    Back to Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

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
