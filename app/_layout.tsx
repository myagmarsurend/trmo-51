import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Device from "expo-device";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import React, { useContext, useEffect, useRef } from "react";
import { Platform } from "react-native";
import FlashMessage from "react-native-flash-message";
import { PaperProvider } from "react-native-paper";

import Loader from "./screens/loader";

import { GlobalContext, GlobalProvider } from "@/context/globalCtx";

export { ErrorBoundary } from "expo-router";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      console.error("🚀 ~ getToken ~ err:", err);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("🚀 ~ getToken ~ err:", err);
    }
  },
};

const fetchUserData = async (context: any, userId: string) => {
  await context?.request({
    url: `user/${userId}`,
    method: "GET",
    model: "userInfo",
  });
  await context?.request({
    url: "transaction/all",
    model: "transactionall",
  });
  await context?.request({
    url: "group/all",
    model: "groupall",
  });
  await context?.request({
    url: "wallet/all",
    model: "walletall",
  });
  await context?.request({
    url: "transaction/all",
    model: "recenttransactions",
    body: {
      limit: 3,
    },
  });
};

const InitialLayout = () => {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const context = useContext(GlobalContext);
  const { userInfo } = context?.data || {};

  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: any) => {
      if (
        token &&
        userInfo &&
        (!userInfo?.notificationToken ||
          userInfo?.notificationToken !== token?.toString())
      ) {
        const save = async () => {
          await context?.request({
            url: `user/${userId}`,
            method: "PUT",
            model: "userInfo",
            body: { notificationToken: token?.toString() },
            useLoading: false,
          });
        };
        save();
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification: any) => {});

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const inTabsGroup = segments[0] === "(app)";
    if (isSignedIn && !inTabsGroup) {
      router.replace("/(app)/home");
    } else if (!isSignedIn) {
      router.replace("/(sign-in)");
    }

    if (isSignedIn) {
      fetchUserData(context, userId);
    }
  }, [isSignedIn]);

  return <Slot />;
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Commissioner: require("../assets/fonts/Commissioner-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const key = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={
        key || "pk_test_c29jaWFsLXBlcmNoLTk4LmNsZXJrLmFjY291bnRzLmRldiQ"
      }
    >
      <GlobalProvider>
        <PaperProvider>
          <FlashMessage position="top" />
          <Loader />
          <InitialLayout />
        </PaperProvider>
      </GlobalProvider>
    </ClerkProvider>
  );
}

async function schedulePushNotification() {
  const now = new Date();

  const targetDate = new Date();
  targetDate.setHours(18, 0, 0, 0);

  let timeDifference = targetDate.getTime() - now.getTime();

  if (now.getDay() === 0) {
    // Sunday
    if (now.getHours() >= 18) {
      timeDifference += 7 * 24 * 60 * 60 * 1000;
    }
  } else if (now.getDay() === 6) {
    if (now.getHours() >= 18) {
      timeDifference += 7 * 24 * 60 * 60 * 1000;
    }
  } else {
    const daysDifference = 6 - now.getDay();
    timeDifference += daysDifference * 24 * 60 * 60 * 1000;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Track Money",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: {
      seconds: Math.floor(timeDifference / 1000),
    },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "0969a75e-74f9-4d87-a7ff-7a3f65ab956a",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
