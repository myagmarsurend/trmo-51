import Slider from "@react-native-community/slider";
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

import { Button, Select } from "@/components";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";
import { ExpenseCategories } from "@/static/category";

const screen = Dimensions.get("screen");
const Index: React.FC = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const budgetall = context?.data?.budgetall;
  const [value, setValue] = useState<any>("₮0");
  const [category, setCategory] = useState("1");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [sliderValue, setSliderValue] = useState(80);
  const month = (new Date().getMonth() + 1).toString();

  const handleChange = (text: string) => {
    if (text?.length >= 1) {
      setValue(text);
    }
  };
  const handleSelectCatChange = (value: any) => {
    setCategory(value);
  };

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const onContinuePress = async () => {
    const body = {
      budgetValue: parseInt(value.split("₮")[1], 10),
      nowValue: 0,
      category,
      month,
      isNotification: isSwitchOn,
      notificationPercent: isSwitchOn ?? sliderValue,
    };

    const ids = (budgetall || []).map((i: any) => i?.category);

    if (ids.length > 0 && ids.includes(body.category)) {
      showMessage({
        type: "warning",
        message: "Та уг ангилалд аль хэдийн төсөв үүсгэсэн байна",
      });
      return;
    }

    if (body.budgetValue <= 0) {
      showMessage({
        type: "warning",
        message: "Мөнгөн дүнгээ зөв оруулна уу",
      });
      return;
    }
    const res = await context?.request({
      model: "budgetinput",
      url: "budget",
      body,
      isNotification: true,
    });
    if (res?.success) {
      router.navigate("(app)/report");

      await context?.request({
        url: "budget/all",
        model: "budgetall",
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
        <Text style={style.headerText}>Төсөв үүсгэх</Text>
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
            <Select
              data={ExpenseCategories}
              value={category}
              handleChange={handleSelectCatChange}
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
                }}
              >
                <Slider
                  style={{ width: "85%" }}
                  minimumValue={0}
                  maximumValue={100}
                  step={5}
                  maximumTrackTintColor={Global.colors.background}
                  minimumTrackTintColor={Global.colors.green}
                  value={sliderValue}
                  onValueChange={setSliderValue}
                />
                <Text>{sliderValue}%</Text>
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
