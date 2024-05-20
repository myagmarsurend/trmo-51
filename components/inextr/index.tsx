import React, { memo, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";

import Global from "@/constants/Global";

const local_data = [
  {
    value: "1",
    lable: "Country 1",
    image: {
      uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    },
  },
  {
    value: "2",
    lable: "Country 2",
    image: {
      uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    },
  },
  {
    value: "3",
    lable: "Country 3",
    image: {
      uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    },
  },
  {
    value: "4",
    lable: "Country 4",
    image: {
      uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    },
  },
  {
    value: "5",
    lable: "Country 5",
    image: {
      uri: "https://www.vigcenter.com/public/all/images/default-image.jpg",
    },
  },
];

const Index: React.FC = () => {
  const [value, setValue] = useState<any>("₮0");
  const [country, setCountry] = useState("1");

  const handleChange = (text: string) => {
    if (text?.length >= 1) {
      setValue(text);
    }
  };
  return (
    <View style={style.container}>
      <View style={style.inputContainer}>
        <Text style={style.text}>Хэр их вэ?</Text>
        <TextInput
          style={style.input}
          value={value}
          defaultValue="0"
          onChangeText={handleChange}
          keyboardType="numeric"
        />
      </View>
      <View style={style.botomContainer}>
        <SelectCountry
          style={styles.dropdown}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          iconStyle={styles.iconStyle}
          maxHeight={200}
          value={country}
          data={local_data}
          valueField="value"
          labelField="lable"
          imageField="image"
          placeholder="Select country"
          searchPlaceholder="Хайх..."
          onChange={(e) => {
            setCountry(e.value);
          }}
        />
        <TextInput style={style.textInput} />
        <TextInput style={style.textInput} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  income: {
    backgroundColor: Global.colors.income,
  },
  expense: {
    backgroundColor: Global.colors.expense,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 20,
    borderRadius: 22,
    backgroundColor: Global.colors.income,
    paddingHorizontal: Global.padding.inputMoney,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
  },
  botomContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: Global.colors.white,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    marginHorizontal: -Global.padding.inputMoney,
  },
  text: {
    color: "#FCFCFC",
    fontSize: 20,
  },
  textInput: { borderColor: Global.colors.text, borderWidth: 1 },
  input: {
    color: Global.colors.white,
    fontSize: 60,
  },
});

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: "#EEEEEE",
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default memo(Index);
