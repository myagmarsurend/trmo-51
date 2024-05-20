import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import Global from "@/constants/Global";

export type Props = {
  label: string;
  onPress: (() => void) | undefined;
  mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  btnColor?: string;
  txtColor?: string;
  icon?: IconSource;
};

const Index: React.FC<Props> = ({
  btnColor = Global.colors.background,
  txtColor = "#000",
  label,
  onPress,
  mode = "contained",
  icon,
}) => {
  return (
    <Button
      style={style.button}
      mode={mode}
      onPress={onPress}
      buttonColor={btnColor}
      textColor={txtColor}
      icon={icon}
      labelStyle={style.label}
    >
      {label}
    </Button>
  );
};

const style = StyleSheet.create({
  button: {
    borderRadius: 20,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.1,
    minWidth: "40%",
    opacity: 0.7,
  },
  label: {},
});

export default memo(Index);
