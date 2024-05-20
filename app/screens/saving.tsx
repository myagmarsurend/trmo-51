import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { memo, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Platform,
} from "react-native";
import { IconButton, ProgressBar } from "react-native-paper";

import { Button } from "@/components";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";
import { formatCurrency } from "@/utils";

const screen = Dimensions.get("screen");
const Index = () => {
  const router = useRouter();
  const context = useContext(GlobalContext);
  const savingall = context?.data?.savingall || [];

  useEffect(() => {
    initial();
  }, []);

  const initial = async () => {
    await context?.request({
      url: "saving/all",
      model: "savingall",
    });
  };

  const handleLeft = () => {
    // if (month === "1") {
    //   setMonth("12");
    // } else {
    //   setMonth((Number(month) - 1).toString());
    // }
    router.navigate("/(app)/profile");
  };

  const handleCreate = () => {
    router.navigate("/screens/savingInput");
  };

  const renderItem = (item: any) => {
    console.log(item);
    const onPress = () => {
      router.navigate({ pathname: `/savings/[id]`, params: item });
    };

    return (
      <Pressable onPress={onPress}>
        <View style={styles.item}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "500" }}>{item?.name}</Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 18,
                color: Global.colors.green,
              }}
            >
              Хуримтлалдаа хүрэхэд:{" "}
              {formatCurrency(
                item?.savingValue > item?.nowValue
                  ? item?.savingValue - item?.nowValue
                  : 0
              )}
            </Text>
          </View>
          <View>
            <ProgressBar
              progress={(item?.nowValue / item?.savingValue) | 0}
              theme={{
                colors: {
                  primary: Global.colors.green,
                  surfaceVariant: Global.colors.gray,
                },
                roundness: 16,
              }}
              style={{ height: 10, borderRadius: 10 }}
            />
          </View>
          <View>
            <Text style={{ color: Global.colors.gray }}>
              {formatCurrency(item?.savingValue)} /{" "}
              {formatCurrency(item?.nowValue)}
            </Text>
          </View>
          {item?.savingValue < item?.nowValue ?? (
            <Text style={{ color: Global.colors.expense }}>
              Та хязгаарыг хэтрүүлсэн байна!
            </Text>
          )}
          {item?.savingValue < item?.nowValue ?? (
            <MaterialIcons
              style={{ position: "absolute", right: 3, top: 3 }}
              name="error"
              size={26}
              color={Global.colors.expense}
            />
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={26}
          onPress={handleLeft}
          iconColor={Global.colors.background}
        />
        <Text style={styles.headerText}>Хуримтлал</Text>
        <IconButton
          icon="arrow-right"
          size={26}
          onPress={() => {}}
          iconColor={Global.colors.green}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ height: screen.height * 0.8 }}>
          <FlashList
            data={savingall}
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
                Хуримтлал алгаа
              </Text>
            }
            estimatedItemSize={10}
          />
        </View>
        <Button
          customStyle={styles.button}
          label="Хуримтлал үүсгэх"
          onPress={handleCreate}
        />
      </View>
    </View>
  );
};

export default memo(Index);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Global.colors.green,
    height: screen.height,
  },
  bottomContainer: {
    backgroundColor: Global.colors.background,
    height: screen.height * 0.89,
    width: screen.width,
    paddingHorizontal: Global.padding.screen,
    paddingVertical: Global.padding.screen,
    borderStartEndRadius: 24,
    borderStartStartRadius: 24,
    zIndex: 2,
  },
  button: {
    position: "absolute",
    alignSelf: "center",
    bottom: Platform.OS === "ios" ? 20 : 25,
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    color: Global.colors.background,
  },

  // item
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Global.colors.gray,
    padding: 10,
  },
  itemText: {},
});
