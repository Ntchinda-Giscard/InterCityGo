import React, { useState } from "react";
import { TextInput, View } from "react-native";
import AppButton from "./app-button";

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
    <View>
      <TextInput
        className="bg-white/20 rounded-xl px-4 py-4 mb-4 text-base text-white min-h-[56px]"
        placeholder="Full Name"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={formData.fullName}
        onChangeText={(value) => handleInputChange("fullName", value)}
      />

      <TextInput
        className="bg-white/20 rounded-xl px-4 py-4 mb-4 text-base text-white min-h-[56px]"
        placeholder="Phone Number / Email"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={formData.email_phone}
        onChangeText={(value) => handleInputChange("email_phone", value)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="bg-white/20 rounded-xl px-4 py-4 mb-4 text-base text-white min-h-[56px]"
        placeholder="Password"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={formData.password}
        onChangeText={(value) => handleInputChange("password", value)}
        secureTextEntry
      />
      <TextInput
        className="bg-white/20 rounded-xl px-4 py-4 mb-4 text-base text-white min-h-[56px]"
        placeholder="Confirm Password"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={formData.confirmPassword}
        onChangeText={(value) => handleInputChange("confirmPassword", value)}
        secureTextEntry
      />
      <AppButton title={"Sign Up"} onPress={() => {}} />
    </View>
  );
};

export default SignupRoute;
