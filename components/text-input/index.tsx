import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

import Global from "@/constants/Global";

export type Props = {
  type?: "pass" | "email" | "phone" | "text" | "numeric";
  secure?: boolean;
  value: string;
  placeholder: string;
  onChangeText?: ((text: string) => void) | undefined;
  onPress?: (() => void) | undefined;
  mode?: "flat" | "outlined";
  rIcon?: string;
  numberOfLines?: number;
};

const Index: React.FC<Props> = ({
  type = "text",
  secure = false,
  value,
  placeholder,
  onChangeText,
  onPress,
  mode = "flat",
  rIcon,
  numberOfLines,
}) => {
  const _keyboardType =
    type === "email"
      ? "email-address"
      : type === "phone"
        ? "numeric"
        : "default";

  if (rIcon) {
    return (
      <TextInput
        secureTextEntry={secure}
        activeOutlineColor="#1D1C1A"
        textColor={Global.colors.text}
        keyboardType={_keyboardType}
        style={style.input}
        label={placeholder}
        value={value}
        numberOfLines={numberOfLines}
        mode={mode}
        right={<TextInput.Icon icon={rIcon} onPress={onPress} />}
        onChangeText={onChangeText}
      />
    );
  }

  // if (type === "email") {
  //   return (
  //     <TextInput
  //       activeOutlineColor="#1D1C1A"
  //       textColor="#000"
  //       secureTextEntry={secure}
  //       keyboardType={_keyboardType}
  //       style={style.input}
  //       label={placeholder}
  //       value={value}
  //       mode={mode}
  //       numberOfLines={numberOfLines}
  //       onChangeText={onChangeText}
  //     />
  //   );
  // } else if (type === "pass") {
  //   return (
  //     <TextInput
  //       secureTextEntry
  //       activeOutlineColor="#1D1C1A"
  //       textColor="#000"
  //       keyboardType={_keyboardType}
  //       style={style.input}
  //       label={placeholder}
  //       value={value}
  //       mode={mode}
  //       numberOfLines={numberOfLines}
  //       onChangeText={onChangeText}
  //     />
  //   );
  // }

  return (
    <TextInput
      activeOutlineColor="#1D1C1A"
      textColor={Global.colors.text}
      secureTextEntry={secure}
      keyboardType={_keyboardType}
      style={style.input}
      label={placeholder}
      value={value}
      mode={mode}
      numberOfLines={numberOfLines}
      onChangeText={onChangeText}
    />
  );
};

const style = StyleSheet.create({
  input: {
    borderRadius: 4,
    backgroundColor: "white",
    color: "black",
    minWidth: "80%",
    marginBottom: 8,
  },
});

export default memo(Index);
