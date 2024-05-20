import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";

import Global from "@/constants/Global";
import { WalletCategories } from "@/static/category";

type Props = {
  data: any[];
  placeholder?: string;
  value: string;
  handleChange: (value: any) => void;
};

const Index = ({ data, placeholder = "", value, handleChange }: Props) => {
  const processedData = data.map((item) => ({
    ...item,
    image: {
      uri:
        item.image && item.image.uri
          ? item.image.uri
          : WalletCategories.find(
              (category: any) => category.value === item.category,
            )?.image?.uri ||
            "https://res.cloudinary.com/trmoapp/image/upload/v1713176185/zdd4v4dwjyabbqsz2v79.jpg",
    },
  }));

  return (
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={styles.imageStyle}
      iconStyle={styles.iconStyle}
      containerStyle={styles.containerStyle}
      maxHeight={200}
      value={value}
      data={processedData}
      valueField="id"
      labelField="name"
      imageField="image"
      placeholder={placeholder}
      searchPlaceholder="Хайх..."
      onChange={(e: any) => {
        handleChange(e?.id);
      }}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 56,
    backgroundColor: Global.colors.background,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderColor: Global.colors.whiteBorder,
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
  containerStyle: {
    borderEndEndRadius: 16,
    borderEndStartRadius: 16,
  },
});

export default memo(Index);
