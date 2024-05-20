import React, { memo, useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";

import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";

const screenWidth = Dimensions.get("window").width;

const Index = () => {
  const context = useContext(GlobalContext);

  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    if (context?.data?.transactionall?.data) {
      const newData = context.data.transactionall?.data
        // ?.reverse()
        .map?.((transaction: any) => ({
          value: parseInt(transaction?.value, 10),
        }));
      setLineData(newData);
    }
  }, []);

  return (
    <LineChart
      areaChart
      curved
      data={lineData}
      height={130}
      width={screenWidth - Global.padding.inputMoney * 2}
      initialSpacing={0}
      color1={Global.colors.graphTop}
      textColor1="green"
      hideDataPoints
      hideAxesAndRules
      dataPointsColor1="blue"
      startFillColor1={Global.colors.graphTop}
      startOpacity={0.8}
      endOpacity={0.3}
    />
  );
};

export default memo(Index);
