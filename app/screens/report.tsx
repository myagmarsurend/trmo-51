import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { memo, useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { IconButton } from "react-native-paper";

import Card from "./components/card.tsx";
import CardCategory from "./components/cardCategory.tsx";
import DropdownComponent from "./components/dropdown.tsx";

import { SpendReport } from "@/components";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";

const values = [
  {
    value: "day",
    label: "Өнөөдөр",
  },
  {
    value: "week",
    label: "7 хоног",
  },
  {
    value: "month",
    label: "Сар",
  },
  {
    value: "year",
    label: "Жил",
  },
  {
    value: "all",
    label: "Бүгд",
  },
];

const values2 = [
  {
    value: "transaction",
    label: "Гүйлгээ",
  },
  {
    value: "category",
    label: "Ангилал",
  },
];

const Index = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const [value, setValue] = useState("week");
  const [value2, setValue2] = useState("transaction");
  const [segmentedValue, setSegmentedValue] = useState("expenses");
  const [selectedChart, setSelectedChart] = useState("line");

  const transactions = context?.data?.transactions?.data || [];
  const transactionCats = context?.data?.transactioncats || [];

  useEffect(() => {
    const now = new Date();
    let sdate = new Date();

    switch (value) {
      case "day":
        sdate = new Date(now);
        break;
      case "week":
        sdate.setDate(now.getDate() - 7);
        break;
      case "month":
        sdate.setMonth(now.getMonth() - 1);
        break;
      case "year":
        sdate.setFullYear(now.getFullYear() - 1);
        break;
      case "all":
        sdate = new Date("2010-01-01");
        break;
      default:
        break;
    }

    const fetchData = async () => {
      await context?.request({
        url: "transaction/all",
        model: "transactions",
        body: {
          sdate: sdate.toISOString(),
          edate: now.toISOString(),
          type: segmentedValue,
        },
      });
      await context?.request({
        url: "transaction/all/cat",
        model: "transactioncats",
        body: {
          sdate: sdate.toISOString(),
          edate: now.toISOString(),
          type: segmentedValue,
        },
      });
    };

    fetchData();
  }, [value, segmentedValue]);

  useEffect(() => {
    if (selectedChart === "pie") {
      console.log("🚀 ~ useEffect ~ selectedChart:", selectedChart);
      setValue2("category");
    } else if (selectedChart === "line") {
      console.log("🚀 ~ useEffect ~ selectedChart:", selectedChart);
      setValue2("transaction");
    }
  }, [selectedChart]);

  const renderItem = ({ item }: any) => {
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

  const renderCategory = ({ item }: any) => {
    return (
      <View style={{ paddingTop: 6 }}>
        <CardCategory
          // id={item?.items?._id}
          item={item?.items}
          title={item?.category}
          content={item?.description}
          value={item?.total}
          type={item?.items[0]?.type}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          iconColor={Global.colors.green}
          onPress={() => {
            router.navigate("(app)/all");
          }}
        />
        <Text style={styles.headerText}>Санхүүгийн тайлан</Text>
        <IconButton
          icon="trash-can-outline"
          iconColor={Global.colors.background}
          onPress={() => {}}
        />
      </View>
      <View
        style={{
          paddingTop: 100,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <DropdownComponent
          data={values}
          selected={value}
          handleChange={setValue}
        />

        <View style={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            mode="outlined"
            icon="chart-line"
            iconColor={
              selectedChart === "line"
                ? Global.colors.background
                : Global.colors.gray
            }
            containerColor={
              selectedChart === "line"
                ? Global.colors.green
                : Global.colors.background
            }
            onPress={() => {
              setSelectedChart("line");
            }}
          />
          <IconButton
            mode="outlined"
            icon="chart-pie"
            iconColor={
              selectedChart === "pie"
                ? Global.colors.background
                : Global.colors.gray
            }
            containerColor={
              selectedChart === "pie"
                ? Global.colors.green
                : Global.colors.background
            }
            onPress={() => {
              setSelectedChart("pie");
            }}
          />
        </View>
      </View>
      <View style={styles.container}>
        <SpendReport
          chart={selectedChart}
          segmentedValue={segmentedValue}
          setSegmentedValue={setSegmentedValue}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <DropdownComponent
            data={values2}
            selected={value2}
            handleChange={setValue2}
          />

          <View style={{ display: "flex", flexDirection: "row" }}>
            <IconButton
              icon="filter-variant"
              theme={{ colors: { primary: Global.colors.green } }}
              onPress={() => {}}
            />
          </View>
        </View>
        {value2 === "transaction" ? (
          <FlashList
            data={transactions}
            keyExtractor={(item: any, index) => item._id + index}
            renderItem={renderItem}
            ListEmptyComponent={<Text>Та гүйлгээ хийгээгүй байна</Text>}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={10}
          />
        ) : (
          <FlashList
            data={transactionCats}
            keyExtractor={(item: any, index) => item.category + index}
            renderItem={renderCategory}
            ListEmptyComponent={<Text>Та гүйлгээ хийгээгүй байна</Text>}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={10}
          />
        )}
      </View>
    </View>
  );
};

export default memo(Index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // display: "flex",
    paddingHorizontal: Global.padding.screen,
  },
  headerSection: {
    fontSize: 16,
    fontWeight: "600",
    // backgroundColor: "#f0f0f0",
    padding: 10,
  },
  sheetContainer: {
    paddingHorizontal: Global.padding.screen,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  sheetButton: {
    width: "100%",
    paddingBottom: 25,
  },
  sheetHeader: {
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 10,
  },
  segment: {
    width: "100%",
  },
  header: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // backgroundColor: "transparent",
    // paddingTop: 30,
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
  action: {
    padding: 0,
  },
  flexRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
