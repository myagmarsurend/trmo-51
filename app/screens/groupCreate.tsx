import { useRouter } from "expo-router";
import React, { memo, useContext, useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { IconButton } from "react-native-paper";

import { Button, NormalTextInput } from "@/components";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";

const screen = Dimensions.get("screen");
const Index: React.FC = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [groupName, setGroupName] = useState("");

  const onContinuePress = async () => {
    const body = {
      groupName,
      description,
    };

    if (body.groupName === "" || body.description === "") {
      showMessage({
        type: "warning",
        message: "Нэр эсвэл тайлбараа оруулна уу",
      });
      return;
    }

    const res = await context?.request({
      model: "groupcreate",
      url: "group/create",
      body,
      isNotification: true,
    });
    if (res?.success) {
      router.navigate("/screens/group");

      await context?.request({
        method: "GET",
        url: "group",
        model: "groupall",
      });
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}>
        <IconButton
          icon="arrow-left"
          iconColor={Global.colors.background}
          onPress={() => {
            router.navigate("/screens/group");
          }}
        />
        <Text style={style.headerText}>Групп үүсгэх</Text>
        <View />
      </View>
      <View style={style.innerContainer}>
        <View style={style.inputContainer} />
        <View style={style.bottomContainer}>
          <View style={style.inputFieldsContainer}>
            <NormalTextInput
              placeholder="Групп нэр"
              value={groupName}
              setValue={setGroupName}
              numLines={1}
            />
            <NormalTextInput
              placeholder="Тайлбар"
              value={description}
              setValue={setDescription}
              numLines={1}
            />
          </View>
          <Button
            label="Үүсгэх"
            btnColor={Global.colors.green}
            onPress={onContinuePress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    position: "absolute",
    paddingTop: 50,
    paddingLeft: 10,
    width: "85%",
    zIndex: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: Global.colors.background,
  },
  container: {
    backgroundColor: Global.colors.green,
    height: screen.height,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 24,
    paddingHorizontal: Global.padding.inputMoney,
    backgroundColor: Global.colors.green,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: screen.height * 0.25,
  },
  bottomContainer: {
    height: screen.height * (Platform.OS === "ios" ? 0.7 : 0.75),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: Global.colors.white,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    marginHorizontal: -Global.padding.inputMoney,
    paddingHorizontal: Global.padding.inputMoney,
    paddingVertical: 30,
  },

  inputFieldsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 25,
  },
  text: {
    color: Global.colors.background,
    fontSize: 20,
  },
  input: {
    color: Global.colors.white,
    fontSize: 64,
  },
});

export default memo(Index);
