import { Stack } from "expo-router";

// import "../global.css";

export default function AuthtLayout() {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen
        name="forgot-password"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name="otp-screen"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name="reset-password"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
}
