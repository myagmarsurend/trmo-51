import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { memo, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import Global from "@/constants/Global";

interface Props {
  value: Date;
  setValue: (value: Date) => void;
}

const Index = ({ value, setValue }: Props) => {
  const [date, setDate] = useState(value);
  const [show, setShow] = useState<boolean>(false);

  const onChange = (event: any, selectedDate?: Date) => {
    // event.preventDefault();
    // setShow(Platform.OS === "ios");
    // if (event?.type === "set") {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setValue(currentDate);
    // }
  };

  if (Platform.OS === "ios") {
    return (
      <RNDateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="datetime"
        display="default"
        onChange={onChange}
        style={style.picker}
        locale="mn-MN"
      />
    );
  }

  return (
    <View>
      <Button
        style={{
          width: "100%",
          borderRadius: 16,
          borderColor: Global.colors.whiteBorder,
          backgroundColor: Global.colors.background,
          height: 56,
          padding: 10,
          borderWidth: 1,
        }}
        onPress={() => setShow(true)}
        labelStyle={{ color: "black" }}
      >
        {date.toLocaleDateString()}{" "}
        {date.toLocaleTimeString("mn-MN", { formatMatcher: "basic" })}
      </Button>

      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="datetime"
          display="default"
          onChange={onChange}
          style={style.picker}
          locale="mn-MN"
          onAccessibilityAction={() => setShow(false)}
          onTouchCancel={() => setShow(false)}
        />
      )}
    </View>
  );
};

export default memo(Index);

const style = StyleSheet.create({
  picker: {
    width: "100%",
  },
});
