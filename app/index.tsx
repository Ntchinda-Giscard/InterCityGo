import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
// import {} from ''

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    // Still checking session — show a loading spinner
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (isSignedIn) {
    console.log("User is signed in");
    return <Redirect href={"/(tabs)/home"} />;
  }
  console.log("User is not signed in", isSignedIn);
  return <Redirect href="/(auth)/onboarding" />;
}
