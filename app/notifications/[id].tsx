import { useLocalSearchParams, useRouter } from "expo-router";
import React, { memo, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

import Button from "@/components/button";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";
import formatDate from "@/utils/dateFormat";

const NotificationDetail = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const item = useLocalSearchParams() || {};

  const onConfirm = async () => {
    const res = await context?.request({
      url: `group/confirm/${item?.id}`,
      model: "groupconfirm",
      isNotification: true,
    });

    if (res?.success) {
      router.back();
    }
  };
  const onCancel = async () => {
    const res = await context?.request({
      url: `group/cancel/${item?.id}`,
      model: "groupcancel",
    });
    if (res?.success) {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            iconColor={Global.colors.green}
            onPress={() => {
              router.back();
            }}
          />
          <Text style={styles.headerText}>Мэдэгдэл дэлгэрэнгүй</Text>
          <IconButton
            icon="dots-horizontal"
            iconColor={Global.colors.green}
            // onPress={handleDelete}
          />
        </View>
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.message}>{item?.body}</Text>
        <Text style={styles.timestamp}>
          {formatDate(item?.createdAt.toString(), true)}
        </Text>
      </View>
      {item?.type === "invite" && (
        <View style={styles.bottomContainer}>
          <Button
            label="Зөвшөөрөх"
            btnColor={Global.colors.income}
            onPress={onConfirm}
            customStyle={styles.button}
          />
          <Button
            label="Татгалзах"
            btnColor={Global.colors.expense}
            onPress={onCancel}
            customStyle={styles.button}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingTop: 18,
  },
  bottomContainer: {
    // position: "absolute",
    alignSelf: "center",
    display: "flex",
    // flexDirection: "row",
    alignItems: "center",
    gap: 4,
    bottom: 20,
  },
  button: {
    width: "50%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 14,
    color: "gray",
    marginTop: 15,
  },

  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 2,
  },
  headerText: {
    color: Global.colors.green,
    backgroundColor: "transparent",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default memo(NotificationDetail);
