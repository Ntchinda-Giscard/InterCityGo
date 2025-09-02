import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { MotiView } from "moti";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";

const AnimatedComponent = Animated.createAnimatedComponent(PlatformPressable);

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const getIconsByRouteName = (routeName: string) => {
    switch (routeName) {
      case "home":
        return "home";
      case "rides":
        return "car";
      case "search":
        return "search";
      case "profile":
        return "person-circle-outline";
      default:
        return "chatbubble-ellipses";
    }
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <MotiView key={route.key}>
            <AnimatedComponent
              layout={LinearTransition.springify().damping(12).stiffness(180)}
              key={route.key}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                ...styles.tabBarButton,
                backgroundColor: isFocused
                  ? "rgba(255,255,255,0.4)"
                  : "transparent",
              }}
            >
              <Ionicons
                name={getIconsByRouteName(route.name)}
                size={isFocused ? 24 : 22}
                color={isFocused ? "white" : "rgba(255,255,255,0.4)"}
              />
              {isFocused && (
                <Animated.Text
                  entering={FadeIn.springify()}
                  style={{
                    color: isFocused ? "white" : "rgba(255,255,255,0.4)",
                    fontWeight: isFocused ? "bold" : "normal",
                  }}
                >
                  {label as string}
                </Animated.Text>
              )}
            </AnimatedComponent>
          </MotiView>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
    width: "80%",
    bottom: 30,
    borderRadius: 30,
    padding: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabBarButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 30,
    gap: 8,
  },
});
