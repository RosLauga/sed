import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { FontAwesome5 } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: "bold",
            },
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 size={28} name="beer" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: "bold",
            },
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 size={28} name="search" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
