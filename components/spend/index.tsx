import React, { memo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";

import Graph from "./components/graph.tsx";

import Global from "@/constants/Global";

const Index = () => {
  const [value, setValue] = useState("day");

  return (
    <View style={style.container}>
      <Text style={style.text}>Зарцуулалт</Text>
      <View style={style.graph}>
        {/* <LineChart
          areaChart
          curved
          data={lineData}
          height={130}
          width={screenWidth}
          initialSpacing={0}
          endSpacing={0}
          color1={Global.colors.graphTop}
          textColor1="green"
          adjustToWidth
          hideDataPoints
          hideAxesAndRules
          dataPointsColor1={Global.colors.graphTop}
          startFillColor1={Global.colors.graphTop}
          startOpacity={1}
          endOpacity={0.8}
        /> */}
        <Graph filter={value} />
      </View>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        density="small"
        buttons={[
          {
            value: "day",
            label: "Өнөөдөр",
          },
          {
            value: "week",
            label: "7 хоног",
          },
          { value: "month", label: "Сар" },
          { value: "year", label: "Жил" },
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
    // borderWidth: 1,
  },
  graph: {
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    // paddingHorizontal: -Global.padding.inputMoney,
    // borderWidth: 1,
  },
  graytext: {
    color: Global.colors.gray,
    fontSize: 16,
  },
  text: {
    color: Global.colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
  segment: {
    // backgroundColor: Global.colors.green,
  },
});

export default memo(Index);
