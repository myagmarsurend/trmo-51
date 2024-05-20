import React from "react";
import { View } from "react-native";

type Props = {
  horizantal?: boolean;
  size?: number;
};

const Index: React.FC<Props> = ({ horizantal = false, size }) => {
  return (
    <View
      style={{
        width: horizantal ? size : "auto",
        height: !horizantal ? size : "auto",
      }}
    />
  );
};

export default Index;
