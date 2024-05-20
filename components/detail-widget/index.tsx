import React, { memo, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Global from "@/constants/Global";
import { ExpenseCategories, IncomeCategories } from "@/static/category";
import { InputTypes } from "@/static/types";

interface Props {
  type: string;
  cat: string;
  wallet: string;
}

const Index = ({ type, cat, wallet }: Props) => {
  const [type1, setType1] = useState(type);
  const [cat1, setCat1] = useState(cat);
  const [wallet1, setWallet1] = useState(wallet);

  const handleCat = () => {
    switch (type) {
      case "income":
        setCat1(
          IncomeCategories.find((t) => t.value === cat)?.label || "Бусад",
        );
        break;
      case "expense":
        setCat1(
          ExpenseCategories.find((t) => t.value === cat)?.label || "Бусад",
        );
        break;
      case "transfer":
        setCat1("Шилжүүлэг");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setType1(
      InputTypes.find((t) => t.en.toUpperCase() === type.toUpperCase())
        ?.label || "Орлого",
    );
    handleCat();
    setWallet1(wallet);
  }, []);

  return (
    <View style={style.maincontainer}>
      <View style={style.container}>
        <Text style={style.toptext}>Төрөл</Text>
        <Text style={style.bottomtext}>{type1}</Text>
      </View>
      <View style={style.container}>
        <Text style={style.toptext}>Ангилал</Text>
        <Text style={style.bottomtext}>{cat1}</Text>
      </View>
      <View style={style.container}>
        <Text style={style.toptext}>
          {type === "transfer" ? "Хэн рүү" : "Хэтэвч"}
        </Text>
        <Text style={style.bottomtext}>{wallet1}</Text>
      </View>
    </View>
  );
};

export default memo(Index);

const style = StyleSheet.create({
  maincontainer: {
    // width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    backgroundColor: Global.colors.background,
    paddingHorizontal: 16,
    paddingVertical: 20,
    zIndex: 6,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  toptext: {
    color: Global.colors.gray,
  },
  bottomtext: {
    color: Global.colors.text,
    fontSize: 17,
    // fontWeight: "600",
  },
});
