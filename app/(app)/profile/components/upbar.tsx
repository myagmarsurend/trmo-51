import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { IconButton } from "react-native-paper";

import Male from "@/assets/icons/male.png";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";

interface Props {
  img?: string | any;
  name: string;
}

const Upbar = ({ img = Male, name }: Props) => {
  const router = useRouter();
  const context = useContext(GlobalContext);
  const { userInfo } = context?.data || {};

  const handlePress = () => {
    router.navigate("/screens/info");
  };

  return (
    <View style={style.container}>
      <Pressable onPress={handlePress}>
        <View style={style.innerContainer}>
          <View style={style.imgContainer}>
            {userInfo?.avatar ? (
              <Image
                source={{
                  uri: userInfo?.avatar,
                }}
                width={50}
                height={50}
                borderRadius={50}
              />
            ) : (
              <Image
                source={Male}
                style={{
                  width: 50,
                  height: 50,
                }}
                width={50}
                height={50}
                borderRadius={50}
              />
            )}
          </View>
          <View>
            <Text style={style.name}>{name}</Text>
          </View>
        </View>
      </Pressable>
      <View>
        <IconButton
          icon="pen"
          iconColor={Global.colors.green}
          size={25}
          onPress={handlePress}
        />
      </View>
    </View>
  );
};

export default Upbar;

const style = StyleSheet.create({
  imgContainer: {
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: Global.colors.gray,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 16,
    width: "100%",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: Global.colors.green,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
});
