import React, { memo, useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";

import Graph from "./components/graph.tsx";

import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";
import { formatCurrency } from "@/utils";

type Props = {
  chart?: string;
  segmentedValue?: string;
  setSegmentedValue?: (value: string) => void;
};

const Index: React.FC<Props> = ({
  chart = "line",
  segmentedValue,
  setSegmentedValue,
}) => {
  const context = useContext(GlobalContext);
  const [value, setValue] = useState("expenses");

  const handleValueChange = (newValue: string) => {
    if (setSegmentedValue) {
      setSegmentedValue(newValue);
    } else {
      setValue(newValue);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.graph}>
        <Graph filter={segmentedValue || value} chart={chart} />
        <View style={{ position: "absolute", top: -5 }}>
          <Text style={{ fontSize: 25, fontWeight: "500" }}>
            {segmentedValue === "expenses"
              ? formatCurrency(context?.data?.transactions?.totalExpense)
              : formatCurrency(context?.data?.transactions?.totalIncome)}
          </Text>
        </View>
      </View>
      <SegmentedButtons
        value={segmentedValue || value}
        onValueChange={handleValueChange}
        density="small"
        buttons={[
          { value: "expenses", label: "Зарлага" },
          { value: "incomes", label: "Орлого" },
        ]}
        style={style.segment}
        theme={{
          colors: {
            secondaryContainer: Global.colors.whiteGreen,
            onSecondaryContainer: Global.colors.green,
          },
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 15,
  },
  graph: {},
  graytext: {
    color: Global.colors.gray,
    fontSize: 16,
  },
  text: {
    color: Global.colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
  segment: {},
});

export default memo(Index);
