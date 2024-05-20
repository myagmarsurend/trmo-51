import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { memo, useContext } from "react";
import { Image, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";

const Index: React.FC = () => {
  const router = useRouter();
  const context = useContext(GlobalContext);
  const { userInfo } = context?.data || {};
  const handleDrawer = () => {
    router.navigate("/(app)/profile");
  };
  const handleNotification = () => {
    router.navigate("/screens/notification");
  };

  return (
    <Appbar.Header style={style.header} safeAreaInsets={{ top: 0 }}>
      <Appbar.Action
        size={userInfo?.avatar ? 36 : 28}
        style={style.action}
        icon={() => {
          if (userInfo?.avatar) {
            return (
              <Image
                source={{
                  uri: userInfo?.avatar,
                }}
                width={36}
                height={36}
                borderRadius={18}
              />
            );
          }
          return <Ionicons name="person" size={28} />;
        }}
        onPress={handleDrawer}
      />
      <Appbar.Action
        size={28}
        style={style.action}
        icon={() => <MaterialIcons name="notifications-none" size={28} />}
        onPress={handleNotification}
      />
    </Appbar.Header>
  );
};

const style = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: Global.colors.text,
    shadowOpacity: 0.1,
  },
  action: {
    padding: 0,
  },
});

export default memo(Index);
