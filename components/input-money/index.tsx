import React, { memo, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

interface Props {
  size?: number;
}

const Index = ({ size = 20 }: Props) => {
  const [value, setValue] = useState<any>("₮0");

  const handleChange = (text: string) => {
    if (text?.length >= 1) {
      setValue(text);
    }
  };

  return (
    <TextInput
      style={[style.input, { fontSize: size }]}
      value={value}
      defaultValue="0"
      placeholder="sdf"
      onChangeText={handleChange}
      keyboardType="numeric"
    />
  );
};

export default memo(Index);

const style = StyleSheet.create({
  input: {
    color: "#000",
    fontSize: 20,
  },
});
