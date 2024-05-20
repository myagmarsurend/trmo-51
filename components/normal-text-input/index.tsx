import React, { memo } from "react";
import { TextInput, StyleSheet } from "react-native";

import Global from "@/constants/Global";
type WidthProp = number | `${number}%`;

interface Props {
  value: any;
  setValue(value: any): void;
  numLines?: number;
  placeholder?: string;
  width?: WidthProp;
  editable?: boolean;
  keyboardType?:
    | "default"
    | "numeric"
    | "email-address"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "number-pad"
    | "phone-pad"
    | "name-phone-pad"
    | "decimal-pad"
    | "twitter"
    | "web-search"
    | "visible-password";
}

const Index = ({
  value,
  setValue,
  numLines = 1,
  placeholder,
  width = "100%",
  editable = true,
  keyboardType = "default",
}: Props) => {
  return (
    <TextInput
      placeholder={placeholder}
      numberOfLines={numLines}
      value={value}
      onChangeText={setValue}
      placeholderTextColor={Global.colors.gray}
      style={[style.textInput, { width }]}
      editable={editable}
      keyboardType={keyboardType}
    />
  );
};

export default memo(Index);

const style = StyleSheet.create({
  textInput: {
    borderRadius: 16,
    borderColor: Global.colors.whiteBorder,
    backgroundColor: Global.colors.background,
    height: 56,
    padding: 10,
    borderWidth: 1,
  },
});
