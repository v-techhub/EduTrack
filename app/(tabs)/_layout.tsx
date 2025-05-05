import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#28141A" }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              size={28}
              name="home"
              color={focused ? "#28141A" : "#999"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AddStudent"
        options={{
          title: "Add Student",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              size={28}
              name="user-plus"
              color={focused ? "#28141A" : "#999"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              size={28}
              name="cog"
              color={focused ? "#28141A" : "#999"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
