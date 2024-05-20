import { useLocalSearchParams } from "expo-router";
import React, { memo, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import PagerView from "react-native-pager-view";

import { Button } from "@/components";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";
import { formatCurrency } from "@/utils";

const Index = () => {
  const context = useContext(GlobalContext);
  const { value } = useLocalSearchParams();
  const data = context?.data;
  const totalIncome = data?.userInfo?.totalIncome;
  const totalExpense = data?.userInfo?.totalExpense;
  const [highestExpense, setHighestExpense] = useState(12000);
  const [highestIncome, setHighestIncome] = useState(20000);

  useEffect(() => {
    const now = new Date();
    const newData = data?.transactionall?.data?.filter((transaction: any) => {
      const transactionDate = new Date(transaction.date);
      switch (value) {
        case "day":
          return transactionDate.toDateString() === now.toDateString();
        case "week":
          const oneWeekAgo = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 7
          );
          return transactionDate > oneWeekAgo;
        case "month":
          const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
          );
          return transactionDate > oneMonthAgo;
        case "year":
          const oneYearAgo = new Date(
            now.getFullYear() - 1,
            now.getMonth(),
            now.getDate()
          );
          return transactionDate > oneYearAgo;
        default:
          return true;
      }
    });

    if (newData) {
      const incomes = newData
        .filter((item: any) => item?.type === "income")
        .map((item: any) => {
          return item?.value;
        });
      const expenses = newData
        .filter((item: any) => item?.type === "expense")
        .map((item: any) => item?.value);
      const maxIncome = incomes.length > 0 ? Math.max(...incomes) : 0;
      const maxExpense = expenses.length > 0 ? Math.max(...expenses) : 0;

      setHighestIncome(maxIncome);
      setHighestExpense(maxExpense);
      // setData(newData);
    }
  }, [value, data?.transactionall?.data]);

  const getHead = () => {
    switch (value) {
      case "day":
        return "Өнөөдөр";
      case "week":
        return "Энэ 7 хоног";
      case "month":
        return "Энэ сар";
      case "year":
        return "Энэ жил";
      default:
        return "Бүгд";
    }
  };

  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View
        key="1"
        style={[styles.view, { backgroundColor: Global.colors.expense }]}
      >
        <Text style={styles.headText}>{getHead()}</Text>
        <Text style={styles.storyTextHeader}>Зарцуулсан 💸</Text>
        <Text style={styles.storyText}>{formatCurrency(totalExpense)}</Text>
        <View style={styles.bottom}>
          <Text style={styles.bottomHeader}>Хамгийн их зарцуулалт</Text>
          <Text style={styles.bottomText}>
            {formatCurrency(highestExpense)}
          </Text>
        </View>
      </View>
      <View
        key="2"
        style={[styles.view, { backgroundColor: Global.colors.income }]}
      >
        <Text style={styles.headText}>{getHead()}</Text>
        <Text style={styles.storyTextHeader}>Олсон 💰</Text>
        <Text style={styles.storyText}>{formatCurrency(totalIncome)}</Text>
        <View style={styles.bottom}>
          <Text style={styles.bottomHeader}>Хамгийн их орлого</Text>
          <Text style={styles.bottomText}>{formatCurrency(highestIncome)}</Text>
        </View>
      </View>
      <View
        key="3"
        style={[styles.view, { backgroundColor: Global.colors.green }]}
      >
        <Text style={styles.headText}>{getHead()}</Text>
        <Text style={styles.storyTextHeader}>Үлдэгдэл 💰</Text>
        <Text style={styles.storyText}>
          {formatCurrency(totalIncome - totalExpense)}
        </Text>
        <View
          style={{
            position: "absolute",
            bottom: 50,
            width: "90%",
          }}
        >
          {/* <Text style={styles.bottomHeader}>Хамгийн их зарцуулалт</Text>
          <Text style={styles.bottomText}>
            {formatCurrency(highestExpense)}
          </Text> */}
          <Button
            label="Дэлгэрэнгүй харах"
            onPress={() => {}}
            btnColor={Global.colors.background}
            txtColor={Global.colors.green}
          />
        </View>
      </View>
    </PagerView>
  );
};

export default memo(Index);

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  view: {
    flex: 1,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  headText: {
    position: "absolute",
    top: 80,
    color: Global.colors.background,
    fontSize: 18,
  },
  storyTextHeader: {
    color: Global.colors.background,
    fontSize: 24,
    fontWeight: "500",
    paddingBottom: 10,
  },
  storyText: {
    color: Global.colors.background,
    fontSize: 36,
    fontWeight: "500",
  },
  bottom: {
    position: "absolute",
    bottom: 50,
    backgroundColor: Global.colors.background,
    borderRadius: 24,
    width: "90%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bottomHeader: {
    color: Global.colors.green,
    fontSize: 18,
  },
  bottomText: {
    color: Global.colors.green,
    fontSize: 20,
  },
});
