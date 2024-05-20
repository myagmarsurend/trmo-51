import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { memo, useState } from "react";
import { View, StyleSheet, Pressable, Text, Platform } from "react-native";
import { showMessage } from "react-native-flash-message";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {
  Button,
  SignInWithOAuth,
  Spacer,
  TextInput,
  Title,
} from "@/components";
import Global from "@/constants/Global";

const Index = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  let completeSignIn: any = null;

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded || emailAddress === "" || password === "") {
      showMessage({
        message: "Талбаруудаа дахин шалгана уу",
        type: "warning",
      });
      return;
    }
    setLoading(true);
    try {
      await signIn
        .create({
          identifier: emailAddress,
          password,
        })
        .then((res) => {
          completeSignIn = res;
        })
        .catch((error) => {
          showMessage({
            message: error.errors[0].message,
            type: "warning",
          });
          setLoading(false);
        });

      await setActive({ session: completeSignIn?.createdSessionId });
      showMessage({ message: "Амжилттай нэвтэрлээ", type: "success" });
    } catch (error: any) {
      showMessage({
        message: error.errors[0].message,
        type: "warning",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Title>Нэвтрэх</Title>

        <Spacer size={100} />
        <TextInput
          type="email"
          placeholder="Имэйл"
          mode="outlined"
          value={emailAddress}
          onChangeText={(value) => setEmailAddress(value)}
        />
        <TextInput
          type="pass"
          secure
          placeholder="Нууц үг"
          mode="outlined"
          value={password}
          onChangeText={(value) => setPassword(value)}
        />

        <Button label="Нэвтрэх" onPress={onSignInPress} loading={loading} />

        <SignInWithOAuth />

        <View style={styles.bottom}>
          {/* <Link href="/reset" asChild> */}
          <Pressable style={styles.button}>
            <Text>Нууц үг мартсан?</Text>
          </Pressable>
          {/* </Link> */}
          <Link href="/(sign-up)" asChild>
            <Pressable style={styles.button}>
              <Text>Бүртгүүлэх</Text>
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default memo(Index);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    paddingHorizontal: Global.padding.inputMoney,
    height: "100%",
    paddingTop: Platform.OS === "ios" ? 50 : 60,
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
  },
});
