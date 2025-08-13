import { useSignUp } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import OAuth from "./oauth";

const SignupRoute = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email_phone: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const onSignUpPress = async () => {
    console.log("onSignUpPress called with formData:", formData);
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      setIsLoading(true);
      await signUp.create({
        emailAddress: formData.email_phone.trim(),
        password: formData.password.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
      });

      //

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setIsLoading(false);

      router.push("/(auth)/otp-screen");

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      setIsLoading(false);
    }
  };

  return (
    <View className="px-4">
      <TextInput
        cursorColor={"rgba(255, 255, 255, 0.7)"}
        className="bg-white/20 rounded-xl px-4 py-4 mb-4 text-base text-white min-h-[56px]"
        placeholder="First Name"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={formData.firstName}
        onChangeText={(value) => handleInputChange("firstName", value)}
      />
      <TextInput
        cursorColor={"rgba(255, 255, 255, 0.7)"}
        className="bg-white/20 rounded-xl px-4 py-4 mb-4 text-base text-white min-h-[56px]"
        placeholder="Last Name"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={formData.lastName}
        onChangeText={(value) => handleInputChange("lastName", value)}
      />

      <TextInput
        cursorColor={"white"}
        className="bg-white/20 rounded-xl px-4 py-4 mb-4 text-base text-white min-h-[56px]"
        placeholder="Email"
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

      <TouchableOpacity onPress={onSignUpPress}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
          colors={["#3B82F6", "#4F46E5"]}
        >
          {!isLoading && (
            <Text className="text-white text-base font-semibold">
              {" "}
              Sign up{" "}
            </Text>
          )}
          {isLoading && <ActivityIndicator color="white" />}
        </LinearGradient>
      </TouchableOpacity>
      <View className="flex-row items-center w-full mt-5 gap-4">
        <View className="h-[1px] bg-white/50 rounded-full flex-1 mx-1" />
        <Text className="text-white/50 font-normal">or continue with</Text>
        <View className="h-[1px] bg-white/50 rounded-full flex-1 mx-1" />
      </View>
      <OAuth />
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
