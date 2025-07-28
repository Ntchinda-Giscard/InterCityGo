import { LinearGradient } from "expo-linear-gradient";
import React, { useReducer } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

const Welcome = () => {
  const [isToggled, toggle] = useReducer((s) => !s, false);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#3B82F6", "#9333EA"]}
        style={styles.background}
      />
      {/* <FirstAnimation width={500} /> */}
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
