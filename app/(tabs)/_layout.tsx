import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const LayOut = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      // tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color="#000" size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" color="#000" size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" color="#000" size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses" color="#000" size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-sharp" color="#000" size={28} />
          ),
        }}
      />
    </Tabs>
  );
};

export default LayOut;
