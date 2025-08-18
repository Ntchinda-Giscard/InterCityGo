import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const _destTeaxtStyle = "text-white text-medium";
const RideCard = () => {
  return (
    <View className="h-fit bg-[rgba(255,255,255,0.2)] rounded-[12px] p-[16px]">
      {/* Top area of destination and stars */}
      <View className=" flex-row justify-between">
        {/* Route*/}
        <View className="flex-row w-fit gap bg-[rgba(255,255,255,0.3)] rounded-full py-2 px-4">
          <Text className={_destTeaxtStyle}> Douala </Text>
          <Ionicons name="arrow-forward" color="#fff" size={24} />
          <Text className={_destTeaxtStyle}> Yaoundé </Text>
        </View>

        <Text> 4.5 </Text>
      </View>
    </View>
  );
};

export default RideCard;
