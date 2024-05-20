import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { memo, useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import Card from "./card";
import ButtonOpacity from "../button-opacity";

import { GlobalContext } from "@/context/globalCtx";

const Index = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();

  const recentTransactions = context?.data?.recenttransactions?.data || [];

  useEffect(() => {
    context?.request({
      url: "transaction/all",
      model: "recenttransactions",
      body: {
        limit: 3,
      },
    });
  }, []);

  const renderItem = (item: any) => {
    return (
      <View style={{ paddingTop: 6 }}>
        <Card
          id={item?._id}
          item={item}
          title={item?.category}
          content={item?.description}
          value={item?.value}
          type={item?.type}
          date={item?.date}
        />
      </View>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.top}>
        <Text style={style.text}>Сүүлийн гүйлгээ</Text>
        <ButtonOpacity
          onPress={() => {
            router.navigate("/(app)/all");
          }}
          label="Бүгдийг харах"
        />
      </View>

      <FlashList
        data={recentTransactions}
        renderItem={({ item }: any) => {
          return renderItem(item);
        }}
        ListEmptyComponent={<Text>Та гүйлгээ хийгээгүй байна</Text>}
        estimatedItemSize={60}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default memo(Index);
