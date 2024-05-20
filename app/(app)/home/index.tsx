import React, { memo, useContext, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { Portal, Modal, Text, Switch } from "react-native-paper";

import Male from "@/assets/icons/male.png";
import { Balance, InEx, RecentTrans, Spend } from "@/components";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";

const Index = () => {
  const context = useContext(GlobalContext);
  const { userInfo, groupvalues, groupall, walletall } = context?.data || {};
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    context?.request({
      url: "group/values",
      model: "groupvalues",
    });
  }, []);

  const onFilter = () => {
    setVisible(true);
  };

  return (
    <ScrollView style={style.container}>
      <View style={{ position: "relative" }}>
        <Balance
          value={walletall?.total | 0}
          data={groupall?.data}
          onFilter={onFilter}
        />
      </View>
      <View style={style.inexContainer}>
        <InEx
          type="in"
          value={groupvalues?.totalIncome | userInfo?.totalIncome}
        />
        <InEx
          type="ex"
          value={groupvalues?.totalExpense | userInfo?.totalExpense}
        />
      </View>
      <Spend />
      <RecentTrans />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{
            // width: "80%",
            marginHorizontal: Global.padding.inputMoney,
            paddingHorizontal: Global.padding.inputMoney,
            paddingVertical: Global.padding.inputMoney,
            backgroundColor: Global.colors.background,
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <View>
            {groupall?.data?.map?.((member: any, index: number) => {
              if (member?.avatar)
                return (
                  <View
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                      paddingTop: 10,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 10,
                      }}
                    >
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
                      <Text style={{ color: Global.colors.green }}>
                        {member?.firstName}
                      </Text>
                    </View>
                    <Switch
                      value
                      color={Global.colors.green}
                      onValueChange={() => {}}
                    />
                  </View>
                );
              else
                return (
                  <View
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                      paddingTop: 10,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        // gap: 10,
                        paddingLeft: 10,
                      }}
                    >
                      <Image
                        style={[
                          style.avatar,
                          {
                            width: 32,
                            height: 32,
                            right: index * 10,
                          },
                        ]}
                        key={index}
                        source={Male}
                        width={32}
                        height={32}
                        borderRadius={50}
                      />
                      <Text style={{ color: Global.colors.green }}>
                        {member?.firstName}
                      </Text>
                    </View>
                    <Switch
                      value
                      color={Global.colors.green}
                      onValueChange={() => {}}
                    />
                  </View>
                );
            })}
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

export default memo(Index);

const style = StyleSheet.create({
  container: {
    paddingHorizontal: Global.padding.screen,
    display: "flex",
    flexDirection: "column",
  },
  inexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  avatar: {
    borderWidth: 1,
    zIndex: 99,
  },
});
