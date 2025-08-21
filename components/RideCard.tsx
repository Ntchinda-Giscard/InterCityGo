import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

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
        <Text className="text-white"> ⭐4.5 </Text>
      </View>
      {/* Driver image and ride details */}
      <View className="flex-row items-center gap-2 mt-2">
        <Image
          source={{ uri: "https://picsum.photos/id/1015/150" }}
          style={{ width: 48, height: 48, borderRadius: 24 }}
          className="border-[2px] border-white/50 rounded-full"
        />
        <View className="">
          <Text className="text-white"> Thomas A. </Text>
          {/* Date and time */}
          <View className="flex-row">
            <Ionicons
              name="calendar-outline"
              color="#rgba(255,255,255,0.4)"
              size={20}
            />
            <Text className="text-white/50"> Sam 27, 07:00 </Text>
          </View>
        </View>
      </View>
      {/* Rides advantages */}
      <View className="flex-row items-center gap-3">
        <View className="flex-col items-center">
          <Ionicons name="snow" color="#fff" size={20} />
          {/* <Text className="text-white/50"> Climatisé </Text> */}
        </View>
        <View className="flex-col items-center">
          <Ionicons name="logo-no-smoking" color="#fff" size={20} />
          {/* <Text className="text-white/50"> Non-fumeur </Text> */}
        </View>
        <View className="flex-col items-center">
          <MaterialIcons name="luggage" color="#fff" size={20} />
          {/* <Text className="text-white/50"> Gros bagages </Text> */}
        </View>
      </View>

      {/* Price and view details */}
      <View className="flex-row items-center justify-between mt-4">
        <View className="flex-col">
          <Text className="text-white"> 5,000 FCFA </Text>
          <View className="flex-row justify-center item-center">
            <MaterialCommunityIcons
              name="seat-passenger"
              color="#ffffff7a"
              size={24}
            />
            <Text className="text-white/50"> 4 places </Text>
          </View>
        </View>
        <Text className="text-white"> Voir détails </Text>
      </View>
    </View>
  );
};

export default RideCard;
