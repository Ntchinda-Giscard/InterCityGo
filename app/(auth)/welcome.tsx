import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const _tab_width = width * 0.8;

const SimpleTest = () => {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const moveBox = () => {
    console.log("Button pressed!"); // Check if this logs
    translateX.value = withSpring(
      translateX.value === 0 ? _tab_width * 0.25 : 0,
      {
        duration: 550,
        dampingRatio: 0.75,
        mass: 4,
        overshootClamping: undefined,
        energyThreshold: 6e-9,
        reduceMotion: ReduceMotion.System,
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => moveBox()} style={styles.button}>
        <Text>Move Box</Text>
      </TouchableOpacity>

      <Animated.View
        className="bg-brand-700"
        style={[
          {
            height: 8,
            width: 64,
            borderRadius: 20,
            marginLeft: -64 / 2,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderRadius: 8,
  },
});

export default SimpleTest;
