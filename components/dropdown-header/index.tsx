import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import Global from "@/constants/Global";
type Props = {
  data: any;
  placeholder?: string;
  selected?: string;
  handleChange: (value: any) => void;
};
const DropdownComponent = ({ data, selected, handleChange }: Props) => {
  const [value, setValue] = useState<any>(selected || "1");
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: Global.colors.text },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.containerStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={200}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item: any) => {
          handleChange(item.value);
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    width: "70%",
    backgroundColor: "transparent",
    padding: 16,
    color: Global.colors.background,
  },
  dropdown: {
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 8,
    color: Global.colors.background,
    backgroundColor: "transparent",
  },
  label: {
    backgroundColor: "transparent",
    zIndex: 999,
    fontSize: 20,
    color: Global.colors.background,
  },
  placeholderStyle: {
    color: Global.colors.background,
    backgroundColor: "transparent",
    fontSize: 16,
  },
  selectedTextStyle: {
    color: Global.colors.background,
    backgroundColor: "transparent",
    fontSize: 20,
    fontWeight: "600",
  },
  containerStyle: {
    borderEndEndRadius: 16,
    borderEndStartRadius: 16,
    backgroundColor: "transparent",
  },
  iconStyle: {
    tintColor: Global.colors.background,
    width: 20,
    height: 20,
  },
});
