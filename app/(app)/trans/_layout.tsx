import { Stack } from "expo-router";
import React from "react";

export default function TransLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
