import { images } from "@/constants/images";
import { useSignIn } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";

const ResetPassword = () => {
  const OTP_EXPIRY_SECONDS = 180; // 3 minutes
  const [countdown, setCountdown] = useState(OTP_EXPIRY_SECONDS);

  useEffect(() => {
    if (countdown <= 0) return; // stop when it hits zero

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn, setActive } = useSignIn();
  const [formData, setFormData] = useState({
    otp: "",
    password: "",
  });
  const [verificationCode, setVerificationCode] = useState({
    state: "default", // default, loading, error
    error: "",
    code: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetPassword = async () => {
    setIsLoading(true);
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: formData.otp,
        password: formData.password,
      })
      .then((result) => {
        if (result.status === "complete") {
          // Set the active session
          //   setActive({ session: result.createdSessionId });
          setIsLoading(false);
          router.replace("/(tabs)/home");
          setError("");
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setIsLoading(false);
        setError(err.errors[0].longMessage);
      });
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
          <View className=" flex-1 px-4 items-center justify-center pt-[20px] ">
            <Image source={images.logo} className="w-[80px] h-[80px]" />
            <Text className="text-white text-2xl font-bold"> InterCityGo </Text>
            <Text className="text-white text-lg font-light mt-2">
              Travel smart between cities
            </Text>
            <View className="flex-1 mt-6">
              <View className="bg-white/20 rounded-[24px] flex-1 mt-4 px-4 py-4">
                <Text className="text-white text-xl font-bold text-center">
                  {" "}
                  Enter Verification Code{" "}
                </Text>
                <Text className="text-white text-md font-light mt-2 text-center">
                  We've sent a 5-digit code to your email address
                </Text>
                <View className="mt-6" />
                <OtpInput
                  onTextChange={(value) => handleInputChange("otp", value)}
                  numberOfDigits={6}
                  focusColor="white"
                  theme={{
                    pinCodeContainerStyle: {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: 12,
                      padding: 10,
                      borderBlockColor: "rgba(255, 255, 255, 0.5)",
                      width: 50,
                      height: 50,
                    },
                    pinCodeTextStyle: {
                      color: "white",
                      fontSize: 20,
                      fontWeight: "bold",
                    },
                  }}
                />

                <TextInput
                  className="bg-white/20 rounded-xl px-4 py-4 mb-4 mt-6 text-base text-white w-full min-h-[56px]"
                  placeholder="Password"
                  placeholderTextColor="rgba(255, 255, 255, 0.7)"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                  secureTextEntry
                />

                <Text className="text-white text-md py-6 font-light mt-2 text-center">
                  Code expires in:{" "}
                  {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
                </Text>

                <TouchableOpacity
                  className="mt-4"
                  onPress={resetPassword}
                  disabled={countdown <= 0}
                >
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                    colors={["#3B82F6", "#4F46E5"]}
                  >
                    {!isLoading && (
                      <Text className="text-white text-base font-semibold">
                        {" "}
                        Reset password{" "}
                      </Text>
                    )}
                    {isLoading && <ActivityIndicator color="white" />}
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {}}
                  className="flex-row items-center p-5 gap-2 justify-center mt-4"
                >
                  <MaterialCommunityIcons
                    name="reload"
                    color="#fff"
                    size={20}
                  />
                  <Text className="text-white font-semibold text-center mt-4 mb-4">
                    Resend Code
                  </Text>
                </TouchableOpacity>
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
                    Back
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

export default ResetPassword;

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
