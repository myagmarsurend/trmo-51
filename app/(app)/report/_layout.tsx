import { Stack } from "expo-router";
import React from "react";

export default function ReportLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // header: () => <AppBar />,
      }}
    />
  );
}
