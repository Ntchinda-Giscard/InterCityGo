import AppInput from "@/components/app-input";
import RideCard from "@/components/RideCard";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const screenHeight = Dimensions.get("window").height;

const Home = () => {
  const { isLoaded, isSignedIn, actor, getToken } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <Text className="text-bold text-white text-3xl"> Welcome 👋 {} </Text>
      <AppInput
        iconLeft={
          <Ionicons name="search" color="#C084FC" size={20} className="m-2" />
        }
        className="bg-white/20 rounded-xl px-4 py-4 mb-4 text-base text-white min-h-[56px] flex-row items-center justify-start"
        placeholder={"Où allez-vous?"}
      />
      <AppInput
        iconLeft={
          <Ionicons name="search" color="#C084FC" size={20} className="m-2" />
        }
        className="bg-white/20 rounded-xl px-4 py-4 mb-4 text-base text-white min-h-[50px] flex-row items-center justify-start"
        placeholder={"Où allez-vous?"}
      />
      <TouchableOpacity
        onPress={() => {}}
        // className="bg-white/20 rounded-xl px-4 py-4 mb-4 flex-row items-center justify-center"
        className="bg-brand-600 rounded-xl px-4 py-4 mb-4 flex-row items-center justify-center"
      >
        <Text className="text-white text-base font-semibold">
          {" "}
          Rechercher des Trajets{" "}
        </Text>
      </TouchableOpacity>

      <Text className="tex-semibold text-lg text-left my-5 text-white">
        {" "}
        Découvrez des trajets populaires{" "}
      </Text>
      <RideCard />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
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
