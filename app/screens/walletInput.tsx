import { useRouter } from "expo-router";
import React, { memo, useContext, useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { IconButton } from "react-native-paper";

import { Button, NormalTextInput, Select } from "@/components";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";
import { WalletCategories } from "@/static/category";

const screen = Dimensions.get("screen");
const Index: React.FC = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const [value, setValue] = useState<any>("₮0");
  const [category, setCategory] = useState("1");
  const [name, setName] = useState("");

  const handleChange = (text: string) => {
    if (text?.length >= 1) {
      setValue(text);
    }
  };
  const handleSelectCatChange = (value: any) => {
    setCategory(value);
  };

  const onContinuePress = async () => {
    const body = {
      value: parseInt(value.split("₮")[1], 10),
      name,
      category,
    };

    if (body.value <= 0) {
      showMessage({
        type: "warning",
        message: "Мөнгөн дүнгээ зөв оруулна уу",
      });
      return;
    }
    const res = await context?.request({
      model: "walletinput",
      url: "wallet",
      body,
      isNotification: true,
    });
    if (res?.success) {
      router.navigate("(app)/profile");

      await context?.request({
        url: "wallet/all",
        model: "walletall",
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
            router.navigate("(app)/report");
          }}
        />
        <Text style={style.headerText}>Хэтэвч үүсгэх</Text>
        <View />
      </View>
      <View style={style.innerContainer}>
        <View style={style.inputContainer}>
          <Text style={style.text}>Мөнгөн дүн</Text>
          <TextInput
            style={style.input}
            value={value}
            defaultValue="0"
            onChangeText={handleChange}
            keyboardType="numeric"
            returnKeyType="done"
          />
        </View>
        <View style={style.botomContainer}>
          <View style={style.inputFieldsContainer}>
            <NormalTextInput
              placeholder="Нэр"
              value={name}
              setValue={setName}
              numLines={1}
            />
            <Select
              data={WalletCategories}
              value={category}
              handleChange={handleSelectCatChange}
            />
          </View>
          <Button
            label="Үргэлжлүүлэх"
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
    height: screen.height * 0.55,
  },
  botomContainer: {
    height: screen.height * (Platform.OS === "ios" ? 0.4 : 0.45),
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
