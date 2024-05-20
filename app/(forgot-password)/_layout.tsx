import { Stack, useRouter } from "expo-router";
import React from "react";
import { IconButton } from "react-native-paper";

export default function SignUpLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        // headerShown: false,
        title: "Кодоо сэргээх",
        headerLeft: () => (
          <IconButton
            icon="arrow-left"
            onPress={() => {
              router.back();
            }}
          />
        ),
      }}
    />
  );
}
