import { useRouter } from "expo-router";
import React, { memo, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import Global from "@/constants/Global";
import { ExpenseCategories, IncomeCategories } from "@/static/category";
import { formatCurrency } from "@/utils";
import formatDate from "@/utils/dateFormat";
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
    | "passive"
    | "income"
    | "expense"
    | "transfer";
  date: string;
  id: string;
  item: any;
};

const Component = ({ id, title, content, value, type, date, item }: Props) => {
  const router = useRouter();
  const [cat, setCat] = useState(title);
  const [icon, setIcon] = useState(
    "https://res.cloudinary.com/trmoapp/image/upload/v1711520130/wz7mfnlibfk4scvgz2pz.png"
  );

  const handleCat = () => {
    switch (type) {
      case "income":
        setCat(
          IncomeCategories.find((t) => t.value === title)?.label || "Бусад"
        );
        break;
      case "expense":
        setCat(
          ExpenseCategories.find((t) => t.value === title)?.label || "Бусад"
        );
        break;
      case "transfer":
        setCat("Шилжүүлэг");
        break;
      default:
        break;
    }
  };

  const handleIcon = () => {
    switch (type) {
      case "income":
        setIcon(
          IncomeCategories.find((t) => t.value === title)?.image?.iconurl ||
            "Бусад"
        );
        break;
      case "expense":
        setIcon(
          ExpenseCategories.find((t) => t.value === title)?.image?.iconurl ||
            "Бусад"
        );
        break;
      case "transfer":
        setIcon("Шилжүүлэг");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleCat();
    handleIcon();
  }, []);

  const navigateTo = () => {
    router.setParams(item);
    router.replace({ pathname: `/transactions/[id]`, params: item });
  };

  return (
    <Card
      contentStyle={style.card}
      theme={{ roundness: 24 }}
      mode="contained"
      onPress={() => navigateTo()}
      id={id}
    >
      <View style={style.first}>
        <View style={style.iconContainer}>
          <Image
            source={{
              uri: icon,
            }}
            style={{ width: 40, height: 40 }}
          />
        </View>
        <View style={style.mid}>
          <Text style={style.title}>{cat}</Text>
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
          {formatCurrency(value * (type === "expense" ? -1 : 1))}
        </Text>
        <Text style={style.date}>{formatDate(date, false)}</Text>
      </View>
    </Card>
  );
};

export default memo(Component);

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
    fontSize: 16,
    fontWeight: "500",
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
