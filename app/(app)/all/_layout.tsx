import { Stack } from "expo-router";
import React from "react";

export default function AllLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
