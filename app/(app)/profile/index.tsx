import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { memo, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import ActionLabel from "./components/actionLabel.tsx";
import Upbar from "./components/upbar.tsx";

import Export from "@/assets/icons/export.png";
import Family from "@/assets/icons/family.png";
import Logout from "@/assets/icons/logout.png";
import Saving from "@/assets/icons/passive.png";
import Settings from "@/assets/icons/settings.png";
import Wallet from "@/assets/icons/wallet.png";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";

const Index = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const context = useContext(GlobalContext);

  const logOut = async () => {
    await signOut();
    router.navigate("/(sign-in)");
  };

  const handleExport = () => {};

  const handleSettings = () => {};

  const handleFamily = () => {
    router.navigate("/screens/group");
  };

  const handleWallet = () => {
    router.navigate("/screens/wallet");
  };

  const handleSaving = () => {
    router.navigate("/screens/saving");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={style.container}>
        <Upbar name={context?.data?.userInfo?.lastName} />
        <View style={style.bottomContainer}>
          <ActionLabel img={Family} name="Гишүүд" onPress={handleFamily} />
          <ActionLabel img={Saving} name="Хуримтлал" onPress={handleSaving} />
          <ActionLabel img={Wallet} name="Хэтэвч" onPress={handleWallet} />
          <ActionLabel
            img={Settings}
            name="Тохиргоо"
            onPress={handleSettings}
          />
          <ActionLabel
            img={Export}
            name="Экселээс татах"
            onPress={handleExport}
          />
          <ActionLabel img={Logout} name="Системээс гарах" onPress={logOut} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default memo(Index);

const style = StyleSheet.create({
  container: {
    height: "100%",
    padding: Global.padding.screen,
    display: "flex",
    paddingTop: 100,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 50,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    // gap: 20,
    width: "100%",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: Global.colors.whiteGreen,
  },
});
