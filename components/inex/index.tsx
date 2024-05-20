import { FontAwesome } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

import Global from "@/constants/Global";
import { formatCurrency } from "@/utils";
type Props = {
  value: number;
  type: "in" | "ex";
};

const Index: React.FC<Props> = ({ value = 0, type }) => {
  return (
    <View
      style={[type === "in" ? style.income : style.expense, style.container]}
    >
      <View style={style.iconContainer}>
        <FontAwesome
          size={28}
          name="money"
          color={type === "in" ? Global.colors.income : Global.colors.expense}
        />
      </View>
      <View style={style.textContainer}>
        <Text style={style.text}>{type === "in" ? "Орлого" : "Зарлага"}</Text>
        <Text style={style.textc}>{formatCurrency(value)}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  income: {
    backgroundColor: Global.colors.income,
  },
  expense: {
    backgroundColor: Global.colors.expense,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 20,
    maxWidth: "50%",
    borderRadius: 28,
  },
  iconContainer: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 16,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    columnGap: 5,
  },
  text: {
    paddingHorizontal: 5,
    color: Global.colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  textc: {
    paddingHorizontal: 5,
    color: Global.colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default memo(Index);
