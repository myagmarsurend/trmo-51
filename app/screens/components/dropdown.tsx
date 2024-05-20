import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import Global from "@/constants/Global";
type Props = {
  data: any;
  placeholder?: string;
  selected?: string;
  handleChange: (selected: any) => void;
};
const DropdownComponent = ({ data, selected, handleChange }: Props) => {
  const [value, setValue] = useState<any>(selected || "day");
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
        value={selected || value}
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
    width: "37%",
    padding: 16,
    color: Global.colors.background,
  },
  dropdown: {
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 8,
    color: Global.colors.green,
  },
  label: {
    backgroundColor: "transparent",
    zIndex: 999,
    fontSize: 16,
    color: Global.colors.green,
  },
  placeholderStyle: {
    color: Global.colors.green,
    backgroundColor: "transparent",
    fontSize: 16,
  },
  selectedTextStyle: {
    color: Global.colors.green,
    backgroundColor: "transparent",
    fontSize: 18,
    fontWeight: "600",
  },
  containerStyle: {
    borderEndEndRadius: 16,
    borderEndStartRadius: 16,
  },
  iconStyle: {
    tintColor: Global.colors.green,
    width: 20,
    height: 20,
  },
});
