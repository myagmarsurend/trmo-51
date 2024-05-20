import { Entypo } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Global from "@/constants/Global";

interface Props {
  onPress: () => void;
}

const Index = ({ onPress }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.view}>
        <Entypo name="attachment" size={20} color="black" />
        <Text>Зураг оруулах</Text>
      </View>
    </Pressable>
  );
};

export default memo(Index);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Global.colors.background,
    height: 56,
    borderRadius: 16,
    borderStyle: "dashed",
    borderColor: Global.colors.whiteBorder,
    borderWidth: 2,
  },
  view: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    gap: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
