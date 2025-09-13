import React from "react";
import { Dimensions, Image, ImageSourcePropType } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type OnBoardingType = {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
};

type CarouselItemProps = {
  index: number;
  scrollX: Animated.SharedValue<number>;
  item: OnBoardingType;
};

const { width, height } = Dimensions.get("screen");

const CarouselItem = (props: CarouselItemProps) => {
  const { item, index, scrollX } = props;

  const itemOpacity = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    return {
      opacity: interpolate(scrollX.value, inputRange, [0, 1, 0]),
    };
  });

  return (
    <Animated.View // Changed from View to Animated.View
      style={[
        {
          width: width,
          alignItems: "center",
        },
        itemOpacity, // Now this will work
      ]}
    >
      <Animated.View
        style={{
          flex: 0.85,
          justifyContent: "center",
        }}
      >
        <Image
          source={item.image}
          style={{
            width: width,
            height: height,
            resizeMode: "contain",
          }}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default CarouselItem;
