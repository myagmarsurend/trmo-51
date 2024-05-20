import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

export type Props = {
  children: React.ReactNode;
  variant?: VariantProp<string>;
  textAlign?: string;
};

const Index: React.FC<Props> = ({ children, variant = "bodyMedium" }) => {
  return (
    <Text variant={variant} style={style.text}>
      {children}
    </Text>
  );
};

const style = StyleSheet.create({
  text: {
    textAlign: "center",
  },
});

export default memo(Index);
