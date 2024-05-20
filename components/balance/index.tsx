import React, { memo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import Male from "@/assets/icons/male.png";
import Global from "@/constants/Global";
import { formatCurrency } from "@/utils";
type Props = {
  value: number;
  data: any;
  onFilter?: any;
};

const Index: React.FC<Props> = ({ value, data, onFilter }) => {
  return (
    <View style={style.container}>
      <Text style={style.graytext}>Үлдэгдэл</Text>
      <Text style={style.text}>{formatCurrency(value)}</Text>
      <Pressable
        style={{ position: "absolute", top: 20, right: 20 }}
        onPress={onFilter}
      >
        {data?.map?.((member: any, index: number) => {
          if (member?.avatar)
            return (
              <Image
                key={index}
                style={[style.avatar, { right: index * 10 }]}
                source={{
                  uri: member?.avatar,
                }}
                width={32}
                height={32}
                borderRadius={50}
              />
            );
          else
            return (
              <Image
                style={[
                  style.avatar,
                  { width: 32, height: 32, right: index * 10 },
                ]}
                key={index}
                source={Male}
                width={32}
                height={32}
                borderRadius={50}
              />
            );
        })}
        {/* <Image
          style={[style.avatar, { width: 32, height: 32, right: 1 * 10 }]}
          source={Male}
          width={32}
          height={32}
          borderRadius={50}
        /> */}
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 15,
  },
  graytext: {
    color: Global.colors.gray,
    fontSize: 18,
  },
  text: {
    paddingTop: 2,
    color: Global.colors.text,
    fontSize: 32,
    fontWeight: "600",
  },
  avatar: {
    position: "absolute",
    borderWidth: 1,
    zIndex: 99,
  },
});

export default memo(Index);
