import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { memo, useContext, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { IconButton, ProgressBar, Card } from "react-native-paper";

import { Button } from "@/components";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";
import { formatCurrency } from "@/utils";
import formatDate from "@/utils/dateFormat";

const Index: React.FC = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const data = useLocalSearchParams() || {};
  const savingValue = Number(data?.savingValue);
  const nowValue = Number(data?.nowValue);
  const label = data?.name;
  const savinghistory = context?.data?.savinghistory || [];

  useEffect(() => {
    context?.request({
      url: `saving/history`,
      model: "savinghistory",
      body: {
        savingId: data?.id,
      },
    });
  }, []);

  const onEditPress = () => {};

  const handleDelete = async () => {
    const res = await context?.request({
      method: "DELETE",
      url: `saving/${data?.id}`,
      model: "delete",
      isNotification: true,
    });
    if (res?.success) {
      router.back();
      await context?.request({
        url: "saving/all",
        model: "savingall",
      });
    }
  };

  const renderItem = (item: any) => {
    console.log("🚀 ~ renderItem ~ item:", item);

    return (
      <View style={{ paddingTop: 5 }}>
        <Card
          contentStyle={style.card}
          theme={{ roundness: 24 }}
          mode="contained"
          onPress={() => {}}
          id={item?.id}
        >
          <View style={style.first}>
            {item?.description ? (
              <Text style={style.title}>{item?.description}</Text>
            ) : (
              <Text style={{ color: Global.colors.gray }}>Тайлбар алгөө</Text>
            )}
            <Text
              style={{
                ...style.value,
                color: Global.colors.income,
              }}
            >
              {formatCurrency(item?.value)}
            </Text>
          </View>
          <View style={style.last}>
            <Text style={style.date}>{formatDate(item?.createdAt, false)}</Text>
          </View>
        </Card>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}>
        <IconButton
          icon="arrow-left"
          iconColor={Global.colors.green}
          onPress={() => {
            router.navigate("/screens/saving");
          }}
        />
        <Text style={style.headerText}>Хуримтлалын дэлгэрэнгүй</Text>
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
            <Text style={{ fontSize: 19 }}>{label}</Text>
          </View>
          <View style={style.inputView}>
            <Text style={style.input}>Хуримтлалдаа хүрэхэд</Text>
            <Text style={style.inputa}>
              {formatCurrency(
                savingValue > nowValue ? savingValue - nowValue : 0
              )}
            </Text>
          </View>
          <ProgressBar
            progress={(nowValue / savingValue) | 50}
            theme={{
              colors: {
                primary: Global.colors.green,
                surfaceVariant: Global.colors.gray,
              },
              roundness: 16,
            }}
            style={{ height: 10, borderRadius: 10 }}
          />
          <View style={{ width: "100%", height: "100%" }}>
            <FlashList
              data={savinghistory}
              renderItem={(item: any) => {
                return renderItem(item.item);
              }}
              ListEmptyComponent={
                <Text
                  style={{
                    alignSelf: "center",
                    paddingTop: 20,
                    color: Global.colors.gray,
                    fontSize: 16,
                  }}
                >
                  Түүх алгаа
                </Text>
              }
              estimatedItemSize={60}
            />
          </View>
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
    paddingTop: 40,
    paddingHorizontal: Global.padding.inputMoney,
    backgroundColor: Global.colors.background,
    height: "100%",
  },
  inputView: {
    gap: 10,
    paddingTop: 0,
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
    fontSize: 20,
  },
  inputa: {
    textAlign: "center",
    fontWeight: "600",
    color: Global.colors.green,
    fontSize: 30,
  },

  ///

  card: {
    borderRadius: 24,
    maxWidth: "100%",
    minHeight: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Global.colors.background,
    padding: 15,
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.1,
  },
  first: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  last: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 10,
  },
  title: {
    color: Global.colors.text,
    fontSize: 16,
    fontWeight: "400",
  },
  content: {
    color: Global.colors.gray,
  },
  value: {
    color: Global.colors.expense,
    fontWeight: "500",
    fontSize: 16,
  },
  date: {
    color: Global.colors.gray,
  },
});

export default memo(Index);
