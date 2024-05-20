import React, { memo, useContext } from "react";
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";

import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";

const Loader = () => {
  const context = useContext(GlobalContext);

  return (
    <Modal visible={context?.loading} style={styles.modal} transparent>
      <View style={styles.MainContainer}>
        <ActivityIndicator size="large" color={Global.colors.green} />
      </View>
    </Modal>
  );
};

export default memo(Loader);

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    opacity: 0,
    // backgroundColor: Global.colors.background,
    // backgroundColor: "transparent",
  },
});
