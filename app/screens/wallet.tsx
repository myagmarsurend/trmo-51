import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { memo, useContext, useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

import { Button } from "@/components";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";
import { WalletCategories } from "@/static/category";
import { formatCurrency } from "@/utils";

const Index = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const walletall = context?.data?.walletall?.data || [];
  const value = context?.data?.walletall?.total | 0;

  useEffect(() => {
    context?.request({
      url: "wallet/all",
      model: "walletall",
    });
  }, []);

  const renderItem = (item: any) => {
    const label =
      WalletCategories.find((t) => t.value === item?.category)?.label ||
      "Бусад";

    const image = WalletCategories.find(
      (t) => t.value === item?.category
    )?.image;

    return (
      <View
        key={item.id}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          width: "100%",
          paddingHorizontal: Global.padding.inputMoney,
          paddingVertical: Global.padding.inputMoney - 5,
          borderBottomWidth: 1,
          borderColor: Global.colors.gray,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image source={image} style={{ width: 40, height: 40 }} />
          <Text
            style={{
              color: Global.colors.green,
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {label}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: Global.colors.green,
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {formatCurrency(item?.value)}
          </Text>
        </View>
      </View>
    );
  };

  const onAddPress = () => {
    router.push("/screens/walletInput");
  };

  return (
    <View style={style.container}>
      <View style={style.topContainer}>
        <View style={style.header}>
          <IconButton
            icon="arrow-left"
            iconColor={Global.colors.green}
            onPress={() => {
              router.replace("/(app)/profile");
            }}
          />
          <Text style={style.headerText}>Хэтэвч</Text>
          <IconButton
            icon="trash-can-outline"
            iconColor={Global.colors.background}
            // onPress={handleDelete}
          />
        </View>
        <View style={style.inputContainer}>
          <Text style={style.text}>Үлдэгдэл</Text>
          <Text style={style.input}>{formatCurrency(value)}</Text>
        </View>
      </View>

      <View style={style.middleContainer}>
        <FlashList
          data={walletall}
          renderItem={({ item }: any) => {
            return renderItem(item);
          }}
          ListEmptyComponent={<Text>Та хэтэвч бүртгүүлээгүй байна</Text>}
          estimatedItemSize={60}
        />
      </View>

      <View style={style.buttonContainer}>
        <Button
          label="+Хэтэвч нэмэх"
          btnColor={Global.colors.green}
          onPress={onAddPress}
        />
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get("window").height;

const style = StyleSheet.create({
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 2,
  },
  container: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    borderRadius: 22,
    paddingHorizontal: Global.padding.inputMoney,
    backgroundColor: Global.colors.white,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingTop: 10,
  },
  topContainer: {
    paddingTop: 50,
    marginHorizontal: -Global.padding.inputMoney,
    paddingHorizontal: Global.padding.inputMoney,
    borderEndStartRadius: 16,
    borderEndEndRadius: 16,
    height: (screenHeight * 30) / 100,
  },
  middleContainer: {
    flex: 1,
  },
  headerText: {
    color: Global.colors.green,
    backgroundColor: "transparent",
    fontSize: 20,
    fontWeight: "600",
  },
  text: {
    color: Global.colors.green,
    marginTop: 10,
    fontSize: 18,
  },
  input: {
    color: Global.colors.green,
    fontSize: 45,
  },
  buttonContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: 10,
  },
});

export default memo(Index);
