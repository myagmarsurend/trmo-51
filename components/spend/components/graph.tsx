import React, { memo, useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { GlobalContext } from "@/context/globalCtx";
const screenWidth = Dimensions.get("window").width;

interface Props {
  filter: string;
}

const Index = ({ filter }: Props) => {
  const context = useContext(GlobalContext);
  const transactionall = context.data?.transactionall?.data;
  const [lineData, setLineData] = useState([0, 45, 28, 80, 99, 0]); // mock data

  const parseTransaction = (transaction: any) => ({
    date: new Date(transaction?.date),
    value: parseInt(transaction?.value, 10),
  });

  useEffect(() => {
    if (transactionall) {
      const now = new Date();
      const newData = transactionall
        .map?.((transaction: any) => parseTransaction(transaction))
        ?.filter?.((transaction: any) => {
          const transactionDate = new Date(transaction.date);
          switch (filter) {
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
        })
        ?.map((transaction: any) => transaction?.value);

      setLineData(newData);
    }
  }, [transactionall, filter]);

  const data = {
    labels: [],
    datasets: [
      {
        data: lineData?.length === 1 ? [lineData[0], 0] : lineData,
        color: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`, // optional
        strokeWidth: 6, // optional
      },
    ],
  };

  const emptyData = {
    labels: [],
    datasets: [
      {
        data: [0, 0],
        color: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`, // optional
        strokeWidth: 6, // optional
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <LineChart
      data={lineData?.length > 0 ? data : emptyData}
      width={screenWidth * 0.9}
      height={220}
      chartConfig={chartConfig}
      withDots={false}
      withHorizontalLabels={false}
      withVerticalLabels={false}
      withHorizontalLines={false}
      withInnerLines={false}
      withVerticalLines={false}
      withOuterLines={false}
      bezier
    />
  );
};

export default memo(Index);
