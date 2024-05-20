import React, { memo, useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";

import { GlobalContext } from "@/context/globalCtx";
import { ExpenseCategories, IncomeCategories } from "@/static/category";
const screenWidth = Dimensions.get("window").width;

interface Props {
  filter: string;
  chart?: string;
}
const dataS = [
  {
    name: "Хувцас",
    total: 21500000,
  },
  {
    name: "Хоол",
    total: 2800000,
  },
  {
    name: "СӨХ",
    total: 527612,
  },
  {
    name: "Цахилгаан",
    total: 8538000,
  },
  {
    name: "Тээвэр",
    total: 11920000,
  },
];
const Index = ({ filter, chart = "line" }: Props) => {
  const context = useContext(GlobalContext);
  const transactions = context.data?.transactions?.data;
  const transactioncats = context.data?.transactioncats;
  const [lineData, setLineData] = useState([0, 45, 28, 80, 99, 0]); // mock data
  const [pieData, setPieData] = useState(dataS);

  const parseTransaction = (transaction: any) => ({
    date: new Date(transaction?.date),
    value: parseInt(transaction?.value, 10),
  });

  const getRandomColor = () => {
    const hex = Math.floor(Math.random() * 0xffffff);
    return `#${hex.toString(16).padStart(6, "0")}`;
  };

  useEffect(() => {
    if (transactions) {
      const newData = transactions
        .map?.((transaction: any) => parseTransaction(transaction))
        ?.map((transaction: any) => transaction?.value);

      setLineData(newData);
    }
  }, [transactions]);

  useEffect(() => {
    if (transactioncats) {
      const newData = transactioncats
        .map?.((transaction: any) => {
          return transaction;
        })
        .map?.((tr: any) => {
          let name = "";
          if (filter === "expenses") {
            name =
              ExpenseCategories.find((t) => t.value === tr?.category)?.label ||
              "Бусад";
          } else if (filter === "incomes") {
            name =
              IncomeCategories.find((t) => t.value === tr?.category)?.label ||
              "Бусад";
          }

          const color = getRandomColor();

          return { name, total: tr?.total, color, legendFontSize: 15 };
        });

      setPieData(newData);
    }
  }, [filter, transactioncats]);

  const data = {
    labels: [],
    datasets: [
      {
        data: lineData?.length === 1 ? [0, lineData[0]] : lineData,
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
    style: {
      borderRadius: 16,
      borderWidth: 1,
    },
  };

  if (chart === "pie") {
    return (
      <PieChart
        data={pieData}
        width={screenWidth * 0.9}
        height={200}
        chartConfig={chartConfig}
        accessor="total"
        backgroundColor="transparent"
        paddingLeft="15"
        //   center={[10, 50]}
        //   absolute
      />
    );
  }

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
