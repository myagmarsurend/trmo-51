import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { memo, useContext, useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { IconButton, ProgressBar } from "react-native-paper";

import { Button } from "@/components";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";
import { ExpenseCategories } from "@/static/category";
import { formatCurrency } from "@/utils";

const Index: React.FC = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const data = useLocalSearchParams() || {};
  const category = data?.category?.toString();
  const budgetValue = Number(data?.budgetValue);
  const nowValue = Number(data?.nowValue);
  const [icon, setIcon] = useState(
    "https://res.cloudinary.com/trmoapp/image/upload/v1711520130/wz7mfnlibfk4scvgz2pz.png"
  );
  const [label, setLabel] = useState("Хоол");

  useEffect(() => {
    setIcon(
      ExpenseCategories.find((t) => t.value === category)?.image?.iconurl ||
        "https://res.cloudinary.com/trmoapp/image/upload/v1711520130/wz7mfnlibfk4scvgz2pz.png"
    );
    setLabel(
      ExpenseCategories.find((t) => t.value === category)?.label || "Бусад"
    );
  }, []);

  const onEditPress = () => {
    router.navigate({
      pathname: `/budgetedits/[id]`,
      params: { id: data?.id },
    });
  };

  const handleDelete = async () => {
    const res = await context?.request({
      method: "DELETE",
      url: `budget/${data?.id}`,
      model: "delete",
      isNotification: true,
    });
    if (res?.success) {
      router.back();
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
          iconColor={Global.colors.green}
          onPress={() => {
            router.navigate("(app)/report");
          }}
        />
        <Text style={style.headerText}>Төсвийн дэлгэрэнгүй</Text>
        <IconButton
          icon="trash-can-outline"
          iconColor={Global.colors.green}
          onPress={handleDelete}
        />
      </View>
      <View style={style.innerContainer}>
        <View style={style.inputFieldsContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingTop: 50,
            }}
          >
            <Image
              source={{
                uri: icon,
              }}
              style={{ width: 32, height: 32 }}
            />
            <Text style={{ fontSize: 19 }}>{label}</Text>
          </View>
          <View style={style.inputView}>
            <Text style={style.input}>Үлдсэн</Text>
            <Text style={style.inputa}>
              {formatCurrency(
                budgetValue > nowValue ? budgetValue - nowValue : 0
              )}
            </Text>
          </View>
          <ProgressBar
            progress={(nowValue / budgetValue) | 50}
            theme={{
              colors: {
                primary: Global.colors.green,
                surfaceVariant: Global.colors.gray,
              },
              roundness: 16,
            }}
            style={{ height: 10, borderRadius: 10 }}
          />
          {/* {budgetValue > nowValue ?? ( */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              backgroundColor: Global.colors.expense,
              padding: 10,
              borderRadius: 24,
            }}
          >
            <MaterialIcons
              name="error"
              size={26}
              color={Global.colors.background}
            />
            <Text style={{ color: Global.colors.background }}>
              Та хязгаарыг хэтрүүлсэн байна!
            </Text>
          </View>
          {/* )} */}
        </View>

        <Button
          label="Засах"
          btnColor={Global.colors.green}
          onPress={onEditPress}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    position: "absolute",
    paddingTop: 50,
    paddingHorizontal: 10,
    width: "100%",
    zIndex: 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: Global.colors.green,
  },
  container: {
    backgroundColor: Global.colors.background,
    // height: screen.height,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 24,
    paddingTop: 70,
    paddingHorizontal: Global.padding.inputMoney,
    backgroundColor: Global.colors.background,
    height: "100%",
  },
  inputView: {
    gap: 10,
    paddingTop: 20,
  },
  inputFieldsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 25,
  },
  text: {
    color: Global.colors.background,
    fontSize: 20,
  },
  input: {
    textAlign: "center",
    color: Global.colors.green,
    fontSize: 22,
  },
  inputa: {
    textAlign: "center",
    fontWeight: "600",
    color: Global.colors.green,
    fontSize: 30,
  },
});

export default memo(Index);
