import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

import Wallet from "@/assets/icons/wallet.png";
import Global from "@/constants/Global";

interface Props {
  img?: string | any;
  name: string;
  onPress: () => void;
}

const ActionLabel = ({ img = Wallet, name, onPress }: Props) => {
  return (
    <Pressable style={style.container} onPress={onPress}>
      <View style={style.imgContainer}>
        <Image source={img} style={{ width: 50, height: 50 }} />
      </View>
      <Text style={style.name}>{name}</Text>
    </Pressable>
  );
};

export default ActionLabel;

const style = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    // borderRadius: 16,
    backgroundColor: Global.colors.white,
    borderBottomWidth: 1,
    borderColor: Global.colors.whiteGreen,
  },
  imgContainer: {},
  name: {
    fontSize: 16,
    color: Global.colors.green,
  },
});
