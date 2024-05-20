import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { memo, useContext, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";
import formatDate from "@/utils/dateFormat";

const Index = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const notificationall = context?.data?.notificationall ?? [];

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    await context?.request({
      url: "notification/all",
      model: "notificationall",
    });
  };

  const renderItem = (item: any) => {
    return (
      <Pressable
        onPress={() => {
          router.navigate({ pathname: `/notifications/[id]`, params: item });
        }}
        key={item.id}
        style={style.cardContainer}
      >
        {/* <View key={item.id} style={style.cardContainer}> */}
        <View style={style.cardLeft}>
          <Text style={style.cardTitle}>{item?.title}</Text>
          <Text style={style.cardBody}>
            {item?.body?.length > 40
              ? `${item.body.substring(0, 40)}...`
              : item.body}
          </Text>
        </View>
        <View style={style.cardRight}>
          <Text style={style.cardDate}>{formatDate(item?.createdAt)}</Text>
        </View>
        {/* </View> */}
      </Pressable>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.topContainer}>
        <View style={style.header}>
          <IconButton
            icon="arrow-left"
            iconColor={Global.colors.green}
            onPress={() => {
              router.back();
            }}
          />
          <Text style={style.headerText}>Мэдэгдэл</Text>
          <IconButton
            icon="trash-can-outline"
            iconColor={Global.colors.background}
            // onPress={handleDelete}
          />
        </View>
      </View>

      <View style={style.middleContainer}>
        <FlashList
          data={notificationall}
          renderItem={({ item }: any) => {
            return renderItem(item);
          }}
          ListEmptyComponent={<Text>Танд мэдэгдэл ирээгүй байна</Text>}
          estimatedItemSize={60}
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
    height: "100%",
    paddingTop: 10,
  },
  headerText: {
    color: Global.colors.green,
    backgroundColor: "transparent",
    fontSize: 18,
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
    height: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: Global.colors.whiteGreen,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "500",
    color: Global.colors.green,
  },
  cardBody: {
    color: Global.colors.gray,
    fontSize: 13.5,
  },
  cardDate: {
    color: Global.colors.gray,
  },
  cardLeft: {
    gap: 6,
  },
  cardRight: {},
});

export default memo(Index);
