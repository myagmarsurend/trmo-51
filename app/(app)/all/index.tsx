import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, StyleSheet, SectionList, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { IconButton, SegmentedButtons, Button } from "react-native-paper";

import Card from "./components/card.tsx";
import DropdownComponent from "./components/dropdown.tsx";

import { Button as Buttonc } from "@/components";
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

const Index = () => {
  const context = useContext(GlobalContext);
  const data = context?.data;
  const router = useRouter();
  const [transactions, setTransactions] = useState(
    data?.transactionall?.data || [],
  );
  const [value, setValue] = useState("week");

  const [filters, setFilters] = useState<string[]>([]);
  const [order, setOrder] = useState<string>("");

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["20%", "40%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClear = () => {
    setFilters([]);
    setOrder("");
  };

  const sections = useMemo(() => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    const groupedByDate = transactions.reduce((acc: any, item: any) => {
      const dateStr = item.date.split("T")[0];
      let title = "";
      if (dateStr === todayStr) {
        title = "Өнөөдөр";
      } else if (dateStr === yesterdayStr) {
        title = "Өчигдөр";
      } else {
        title = dateStr;
      }

      const section = acc.find((section: any) => section.title === title);
      if (section) {
        section.data.push(item);
      } else {
        acc.push({ title, data: [item] });
      }
      return acc;
    }, []);

    groupedByDate.forEach((section: any) => {
      switch (order) {
        case "highest":
          section.data.sort(
            (a: any, b: any) => Number(b.value) - Number(a.value),
          );
          break;
        case "lowest":
          section.data.sort(
            (a: any, b: any) => Number(a.value) - Number(b.value),
          );
          break;
        case "oldest":
          section.data.sort(
            (a: any, b: any) =>
              new Date(a.date).getTime() - new Date(b.date).getTime(),
          );
          break;
        default:
          section.data.sort(
            (a: any, b: any) =>
              new Date(b.date).getTime() - new Date(a.date).getTime(),
          );
      }
    });

    groupedByDate.sort((a: any, b: any) => {
      if (a.title === "Өнөөдөр") return -1;
      if (b.title === "Өнөөдөр") return 1;
      if (a.title === "Өчигдөр") return -1;
      if (b.title === "Өчигдөр") return 1;
      return new Date(b.title).getTime() - new Date(a.title).getTime();
    });

    return groupedByDate;
  }, [transactions]);

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

  const renderSectionHeader = ({ section: { title } }: any) => (
    <Text style={styles.headerSection}>{title}</Text>
  );

  const handleSearch = useCallback(() => {
    let filteredTransactions = [...(data?.transactionall?.data || [])];

    if (filters.length > 0) {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        filters.includes(transaction?.type),
      );
    }

    const now = new Date();
    filteredTransactions = filteredTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      switch (value) {
        case "day":
          return transactionDate.toDateString() === now.toDateString();
        case "week":
          const oneWeekAgo = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 7,
          );
          return transactionDate > oneWeekAgo;
        case "month":
          const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
          );
          return transactionDate > oneMonthAgo;
        case "year":
          const oneYearAgo = new Date(
            now.getFullYear() - 1,
            now.getMonth(),
            now.getDate(),
          );
          return transactionDate > oneYearAgo;
        default:
          return true;
      }
    });

    switch (order) {
      case "highest":
        filteredTransactions.sort(
          (a, b) => parseInt(b.value, 10) - parseInt(a.value, 10),
        );
        break;
      case "lowest":
        filteredTransactions.sort(
          (a, b) => parseInt(a.value, 10) - parseInt(b.value, 10),
        );
        break;
      case "oldest":
        filteredTransactions.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      default:
        break;
    }

    setTransactions(filteredTransactions);
  }, [data?.transactionall?.data, filters, order, value]);

  const handleReport = () => {
    router.push({
      pathname: "/(app)/all/components/story",
      params: { value },
    });
    // router.navigate("/(app)/all/components/story");
  };

  useEffect(() => {
    // setTransactions(newTransactions);
    handleSearch();
  }, [value]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.header}>
          <DropdownComponent
            data={values}
            selected={value}
            handleChange={setValue}
          />
          <IconButton icon="filter-variant" onPress={handlePresentModalPress} />
        </View>
        <View style={styles.container}>
          <Button
            contentStyle={{
              width: "100%",
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            labelStyle={{ color: Global.colors.green }}
            style={{
              backgroundColor: Global.colors.whiteGreen,
              paddingVertical: 6,
              borderRadius: 8,
            }}
            icon="arrow-right"
            onPress={handleReport}
          >
            <Text>Санхүүгийн тайлангаа харна уу</Text>
          </Button>
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => item._id + index}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            ListEmptyComponent={<Text>Та гүйлгээ хийгээгүй байна</Text>}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          // onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.sheetContainer}>
            <View>
              <View style={[styles.flexRow]}>
                <Text style={styles.sheetHeader}>Гүйлгээ шүүх</Text>
                <Button
                  onPress={handleClear}
                  style={{
                    borderRadius: 24,
                    borderWidth: 1,
                    borderColor: Global.colors.green,
                    padding: 0,
                  }}
                  labelStyle={{ color: Global.colors.green }}
                >
                  Цэвэрлэх
                </Button>
              </View>
              <View>
                <Text style={styles.sheetHeader}>Шүүх</Text>
                <SegmentedButtons
                  value={filters}
                  onValueChange={setFilters}
                  density="small"
                  buttons={[
                    {
                      value: "income",
                      label: "Орлого",
                    },
                    {
                      value: "expense",
                      label: "Зарлага",
                    },
                    { value: "transfer", label: "Гүйлгээ" },
                  ]}
                  multiSelect
                  style={styles.segment}
                  theme={{
                    colors: {
                      secondaryContainer: Global.colors.whiteGreen,
                      onSecondaryContainer: Global.colors.green,
                    },
                  }}
                />
              </View>
              <View>
                <Text style={styles.sheetHeader}>Эрэмбэлэх</Text>
                <SegmentedButtons
                  value={order}
                  onValueChange={setOrder}
                  density="small"
                  buttons={[
                    {
                      value: "highest",
                      label: "Их нь урд",
                    },
                    {
                      value: "lowest",
                      label: "Бага нь урд",
                    },
                    { value: "oldest", label: "Хуучин нь урд" },
                  ]}
                  style={styles.segment}
                  theme={{
                    colors: {
                      secondaryContainer: Global.colors.whiteGreen,
                      onSecondaryContainer: Global.colors.green,
                    },
                  }}
                />
              </View>
            </View>
            <View style={styles.sheetButton}>
              <Buttonc label="Хайх" onPress={handleSearch} />
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default memo(Index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Global.padding.screen,
  },
  headerSection: {
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "#f0f0f0",
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingTop: 30,
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
