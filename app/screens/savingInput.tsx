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
import { IconButton, Switch } from "react-native-paper";

import { Button, NormalTextInput } from "@/components";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";

const screen = Dimensions.get("screen");
const Index: React.FC = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const [value, setValue] = useState<any>("₮0");
  const category = "1";
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [name, setName] = useState("");
  const [repeat, setRepeat] = useState(15);
  const month = (new Date().getMonth() + 1).toString();

  const handleChange = (text: string) => {
    if (text?.length >= 1) {
      setValue(text);
    }
  };

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const onContinuePress = async () => {
    const body = {
      savingValue: parseInt(value.split("₮")[1], 10),
      nowValue: 0,
      name,
      repeat,
      category,
      month,
    };

    if (body.savingValue <= 0) {
      showMessage({
        type: "warning",
        message: "Мөнгөн дүнгээ зөв оруулна уу",
      });
      return;
    }
    const res = await context?.request({
      model: "savinginput",
      url: "saving",
      body,
      isNotification: true,
    });
    if (res?.success) {
      router.navigate("/screens/saving");

      await context?.request({
        url: "saving/all",
        model: "savingall",
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
            router.navigate("/screens/saving");
          }}
        />
        <Text style={style.headerText}>Хуримтлал үүсгэх</Text>
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
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 16,
                    color: Global.colors.green,
                  }}
                >
                  Мэдэгдэл авах
                </Text>
                <Text
                  style={{
                    color: Global.colors.gray,
                    flexWrap: "wrap",
                    flexShrink: 1,
                  }}
                >
                  Тодорхой хувьд хүрэхэд мэдэгдэл илгээнэ.
                </Text>
              </View>
              <View>
                <Switch
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
                  color={Global.colors.green}
                />
              </View>
            </View>
            {isSwitchOn && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  borderTopWidth: 1,
                }}
              >
                {/* <Slider
                  style={{ width: "85%" }}
                  minimumValue={0}
                  maximumValue={100}
                  step={5}
                  maximumTrackTintColor={Global.colors.background}
                  minimumTrackTintColor={Global.colors.green}
                  value={sliderValue}
                  onValueChange={setSliderValue}
                />
                <Text>{sliderValue}%</Text> */}
                <Text style={{ color: Global.colors.green, fontWeight: "500" }}>
                  Хоногийн давтамж
                </Text>
                <TextInput
                  value={repeat.toString()}
                  keyboardType="numeric"
                  onChange={(text: any) => setRepeat(parseInt(text ?? 0, 10))}
                  style={{
                    backgroundColor: Global.colors.background,
                    padding: 10,
                  }}
                  returnKeyType="done"
                />
              </View>
            )}
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
