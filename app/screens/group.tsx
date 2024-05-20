import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { memo, useContext, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

import Male from "@/assets/icons/male.png";
import { Button } from "@/components";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";

const Index = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const { userInfo } = context?.data ?? {};
  const groupall = context?.data?.groupall ?? {};

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    await context?.request({
      url: "group/all",
      model: "groupall",
    });
  };

  const renderItem = (item: any) => {
    return (
      <View key={item?.id} style={style.cardContainer}>
        <View style={style.cardImage}>
          {item?.avatar ? (
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
              style={{ width: 50, height: 50 }}
              width={50}
              height={50}
              borderRadius={50}
            />
          )}
        </View>
        <View style={style.cardLabel}>
          <Text style={{ fontWeight: "600" }}>{item?.firstName}</Text>
          <Text>{item?.lastName}</Text>
          <Text style={{ color: Global.colors.gray }}>
            {item?.emailAddress}
          </Text>
        </View>
      </View>
    );
  };

  const onAddPress = () => {
    router.push("/screens/groupInput");
  };

  return (
    <View style={style.container}>
      <View style={style.topContainer}>
        <View style={style.header}>
          <IconButton
            icon="arrow-left"
            iconColor={Global.colors.green}
            onPress={() => {
              router.replace("/(app)/profile");
            }}
          />
          <Text style={style.headerText}>Гишүүд</Text>
          <IconButton
            icon="trash-can-outline"
            iconColor={Global.colors.background}
            // onPress={handleDelete}
          />
        </View>
      </View>

      <View style={style.middleContainer}>
        <FlashList
          data={groupall?.data}
          renderItem={({ item }: any) => {
            return renderItem(item);
          }}
          ListEmptyComponent={<Text>Гишүүд бүртгүүлээгүй байна</Text>}
          estimatedItemSize={10}
        />
      </View>

      <View style={style.buttonContainer}>
        <Button
          label="+Гишүүн нэмэх"
          btnColor={Global.colors.green}
          onPress={onAddPress}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 2,
  },
  container: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    borderRadius: 22,
    paddingHorizontal: Global.padding.inputMoney,
    backgroundColor: Global.colors.white,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  topContainer: {
    paddingTop: 50,
    marginHorizontal: -Global.padding.inputMoney,
    paddingHorizontal: Global.padding.inputMoney,
    borderEndStartRadius: 16,
    borderEndEndRadius: 16,
    // height: (screenHeight * 30) / 100,
  },
  middleContainer: {
    flex: 1,
    paddingTop: 30,
  },
  headerText: {
    color: Global.colors.green,
    backgroundColor: "transparent",
    fontSize: 20,
    fontWeight: "600",
  },
  text: {
    color: Global.colors.green,
    marginTop: 10,
    fontSize: 18,
  },
  input: {
    color: Global.colors.green,
    fontSize: 50,
  },
  buttonContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: 10,
  },

  cardContainer: {
    width: "100%",
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderColor: Global.colors.whiteGreen,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: Global.colors.text,
    shadowOpacity: 0.1,
  },
  cardImage: {},
  cardLabel: {},
});

export default memo(Index);
