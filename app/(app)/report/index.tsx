import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { memo, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  Platform,
} from "react-native";
import { IconButton, ProgressBar } from "react-native-paper";

import { Button } from "@/components";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";
import { ExpenseCategories } from "@/static/category";
import { Months } from "@/static/month";
import { formatCurrency } from "@/utils";

const screen = Dimensions.get("screen");
const Index = () => {
  const router = useRouter();
  const context = useContext(GlobalContext);
  const [month, setMonth] = useState<string>(
    (new Date().getMonth() + 1).toString()
  );
  const [monthLabel, setMonthLabel] = useState<any>(`${month}-р сар`);
  const budgetall = context?.data?.budgetall || [];

  useEffect(() => {
    initial();
  }, []);

  useEffect(() => {
    setMonthLabel(Months.find((m: any) => m.value === month)?.label);
    initial();
  }, [month]);

  const initial = async () => {
    await context?.request({
      url: "budget/all",
      model: "budgetall",
      body: {
        month,
      },
    });
  };

  const handleLeft = () => {
    if (month === "1") {
      setMonth("12");
    } else {
      setMonth((Number(month) - 1).toString());
    }
  };
  const handleRight = () => {
    if (month === "12") {
      setMonth("1");
    } else {
      setMonth((Number(month) + 1).toString());
    }
  };
  const handleCreate = () => {
    router.navigate("/screens/budget");
  };

  const renderItem = (item: any) => {
    console.log(item);

    const cat = ExpenseCategories.find((cat) => cat.value === item.category);

    const onPress = () => {
      router.navigate({ pathname: `/budgets/[id]`, params: item });
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
            <Image
              source={cat?.image}
              style={{ height: 24, width: 24, borderRadius: 50 }}
            />
            <Text style={{ fontWeight: "500" }}>{cat?.label}</Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 18,
                color: Global.colors.green,
              }}
            >
              Үлдсэн{" "}
              {formatCurrency(
                item?.budgetValue > item?.nowValue
                  ? item?.budgetValue - item?.nowValue
                  : 0
              )}
            </Text>
          </View>
          <View>
            <ProgressBar
              progress={(item?.nowValue / item?.budgetValue) | 0}
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
              {formatCurrency(item?.budgetValue | 0)} /{" "}
              {formatCurrency(item?.nowValue | 0)}
            </Text>
          </View>
          {item?.budgetValue < item?.nowValue ?? (
            <Text style={{ color: Global.colors.expense }}>
              Та хязгаарыг хэтрүүлсэн байна!
            </Text>
          )}
          {item?.budgetValue < item?.nowValue ?? (
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
        <Text style={styles.headerText}>{monthLabel}</Text>
        <IconButton
          icon="arrow-right"
          size={26}
          onPress={handleRight}
          iconColor={Global.colors.background}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ height: screen.height * 0.8 }}>
          <FlashList
            data={budgetall}
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
                Төлөвлөгөө алгаа
              </Text>
            }
            estimatedItemSize={10}
          />
        </View>
        <Button
          customStyle={styles.button}
          label="Төсөв үүсгэх"
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
    height: screen.height * (Platform.OS === "ios" ? 0.8 : 0.815),
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
