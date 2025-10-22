import { Tabs } from "expo-router";
import { FontAwesome, FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 8,
          height: 60,
        },
      }}
    >

      <Tabs.Screen
        name="store"
        options={{
          title: "store",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="store" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "levels",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='th-list' size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="themes"
        options={{
          title: "themes",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="brush" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
