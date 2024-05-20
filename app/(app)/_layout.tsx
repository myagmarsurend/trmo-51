import {
  AntDesign,
  FontAwesome,
  FontAwesome6,
  Foundation,
  Ionicons,
} from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import { AppBar } from "@/components";
import Global from "@/constants/Global";

export default function TabsLayout() {
  const router = useRouter();

  const handlePressMid = () => {
    router.navigate("/screens/input");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { height: Platform.OS === "android" ? 60 : 80 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          // headerShown: true,
          header: () => <AppBar />,
          tabBarLabel: "Нүүр",
          title: "Нүүр",
          tabBarActiveTintColor: Global.tabIconFocused,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              size={28}
              style={{ marginBottom: -3 }}
              name="home"
              color={focused ? Global.tabIconFocused : Global.tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="all"
        options={{
          headerShown: false,
          // header: () => <AppBar />,
          tabBarLabel: "Тайлан",
          title: "Тайлан",
          tabBarActiveTintColor: Global.tabIconFocused,
          tabBarIcon: ({ focused }) => (
            <FontAwesome6
              size={28}
              style={{ marginBottom: -3 }}
              name="money-bill-transfer"
              color={focused ? Global.tabIconFocused : Global.tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="trans"
        options={{
          headerShown: true,
          tabBarLabel: "Гүйлгээ",
          title: "Гүйлгээ",
          tabBarActiveTintColor: Global.tabIconFocused,
          tabBarIcon: () => (
            <View
              style={{ ...style.midbtn, backgroundColor: Global.colors.green }}
            >
              <FontAwesome name="plus" size={28} color={Global.colors.white} />
            </View>
          ),
          tabBarHideOnKeyboard: true,
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            handlePressMid();
          },
        })}
      />
      <Tabs.Screen
        name="report"
        options={{
          headerShown: false,
          tabBarLabel: "Төлөвлөлт",
          title: "Төлөвлөлт",
          tabBarActiveTintColor: Global.tabIconFocused,
          tabBarIcon: ({ focused }) => (
            <Foundation
              size={28}
              style={{ marginBottom: -3 }}
              name="graph-bar"
              color={focused ? Global.tabIconFocused : Global.tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: "Профайл",
          title: "Профайл",
          tabBarActiveTintColor: Global.tabIconFocused,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={28}
              style={{ marginBottom: -3 }}
              name="person"
              color={focused ? Global.tabIconFocused : Global.tabIconDefault}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const style = StyleSheet.create({
  midbtn: {
    alignItems: "center",
    justifyContent: "center",
    width: Platform.OS === "ios" ? 50 : 60,
    height: Platform.OS === "ios" ? 50 : 60,
    top: Platform.OS === "ios" ? -10 : -20,
    borderRadius: Platform.OS === "ios" ? 25 : 30,
  },
});
