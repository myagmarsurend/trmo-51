import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import Shopping from "@/assets/icons/shopping.png";
import Global from "@/constants/Global";
import { formatCurrency } from "@/utils";

type Props = {
  title: string;
  content: string;
  value: number;
  type:
    | string
    | "shopping"
    | "food"
    | "subscription"
    | "transport"
    | "salary"
    | "passive";
  isIncome: boolean;
  date: string;
};

const Component = ({ title, content, value, type, date }: Props) => (
  <Card
    contentStyle={style.card}
    theme={{ roundness: 24 }}
    mode="contained"
    onPress={() => alert("You pressed a button")}
  >
    <View style={style.first}>
      <View style={style.iconContainer}>
        <Image source={Shopping} style={{ width: 40, height: 40 }} />
      </View>
      <View style={style.mid}>
        <Text style={style.title}>{title}</Text>
        <Text style={style.content}>{content}</Text>
      </View>
    </View>
    <View style={style.last}>
      <Text
        style={{
          ...style.value,
          color:
            type === "income"
              ? Global.colors.income
              : type === "expense"
                ? Global.colors.expense
                : Global.colors.blue,
        }}
      >
        {formatCurrency(value * (type === "in" ? 1 : -1))}
      </Text>
      <Text style={style.date}>{date}</Text>
    </View>
  </Card>
);

export default React.memo(Component);

const style = StyleSheet.create({
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
    flexDirection: "row",
    gap: 10,
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
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
    fontSize: 17,
    fontWeight: "600",
  },
  content: {
    color: Global.colors.gray,
  },
  value: {
    color: Global.colors.expense,
    fontWeight: "600",
    fontSize: 17,
  },
  date: {
    color: Global.colors.gray,
  },
});
