import { useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import OAuth from "./oauth";

const LoginRoute = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email_phone: "",
    password: "",
    confirmPassword: "",
  });

  const { signIn, setActive, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      setIsLoading(true);
      const signInAttempt = await signIn.create({
        identifier: formData.email_phone.trim(),
        password: formData.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        setIsLoading(false);
        router.replace("/(tabs)/home");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        setIsLoading(false);
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setIsLoading(false);
      Alert.alert("Error", err?.errors?.[0].longMessage || "An error occurred");
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <View className="px-4">
      <TextInput
        className="bg-brand-200 focus:bg-transparent border border-brand-300 text-brand-deep text-semibold rounded-xl px-4 py-4 mb-4 text-base text-white min-h-[56px]"
        placeholder="Phone Number / Email"
        placeholderTextColor="#9133ea"
        value={formData.email_phone}
        onChangeText={(value) => handleInputChange("email_phone", value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="bg-brand-200 focus:bg-transparent border border-brand-300 text-brand-deep text-semibold rounded-xl px-4 py-4 mb-4 text-base text-white min-h-[56px]"
        placeholder="Password"
        placeholderTextColor="#9133ea"
        value={formData.password}
        onChangeText={(value) => handleInputChange("password", value)}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => router.push("/forgot-password")}>
        <Text className="text-brand-700 font-normal text-right mb-4">
          {" "}
          Forgot Password?{" "}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onSignInPress}
        className="bg-brand-500 rounded-xl py-4 justify-center items-center"
      >
        {!isLoading && (
          <Text className="text-xl font-semibold text-white"> Login </Text>
        )}
        {isLoading && <ActivityIndicator color="white" />}
      </TouchableOpacity>
      <View className="flex-row items-center w-full mt-5 gap-4">
        <View className="h-[1px] bg-brand-700 rounded-full flex-1 mx-1" />
        <Text className="text-brand-700 font-normal">or continue with</Text>
        <View className="h-[1px] bg-brand-700 rounded-full flex-1 mx-1" />
      </View>
      <OAuth />
    </View>
  );
};

export default LoginRoute;

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
