import AppInput from "@/components/app-input";
import RideCard from "@/components/RideCard";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const screenHeight = Dimensions.get("window").height;

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#3B82F6", "#9333EA"]}
        style={styles.background}
      />

      <Text className="text-bold text-white text-3xl"> Welcome {} </Text>
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
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          // style={styles.gradient}
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 16,
            borderRadius: 12,
          }}
          colors={["#60A5FA", "#A855F7"]}
        >
          <Text className="text-white text-base font-semibold">
            {" "}
            Rechercher des Trajets{" "}
          </Text>
        </LinearGradient>
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
    backgroundColor: "#9333EA",
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
