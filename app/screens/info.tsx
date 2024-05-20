import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";

import { Button, Camera, NormalTextInput, PickerImage } from "@/components";
import Global from "@/constants/Global";
import { GlobalContext } from "@/context/globalCtx";

const Index = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const { userInfo } = context?.data ?? {};
  const [firstName, setFirstName] = useState(userInfo?.firstName);
  const [lastName, setLastName] = useState(userInfo?.lastName);
  const [emailAddress, setEmailAddress] = useState(userInfo?.emailAddress);
  const avatar = userInfo?.avatar;

  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["15%", "20%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    bottomSheetModalRef.current?.close();
    // onSubmit();
  }, [image !== null, camera !== null]);

  const onSubmit = async () => {
    const body = {
      image: image ?? camera,
      firstName,
      lastName,
    };

    await context?.request({
      url: `user/${userInfo?.id}`,
      method: "PUT",
      model: "userInfo",
      body,
      isNotification: true,
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
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
              <Text style={style.headerText}>Хувийн мэдээлэл</Text>

              <View />
            </View>
          </View>

          <View style={style.middleContainer}>
            <View style={style.avatar}>
              <Pressable onPress={handlePresentModalPress}>
                <Image
                  source={{
                    uri:
                      image ||
                      camera ||
                      avatar ||
                      "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
                  }}
                  width={120}
                  height={120}
                  borderRadius={60}
                />
              </Pressable>
            </View>
            <InputRenderer
              value={lastName}
              setValue={setLastName}
              label="Овог"
            />
            <InputRenderer
              value={firstName}
              setValue={setFirstName}
              label="Нэр"
            />
            <InputRenderer
              value={emailAddress}
              setValue={setEmailAddress}
              label="Имейл"
              editable={false}
            />
          </View>

          <View style={style.buttonContainer}>
            <Button
              label="Хадгалах"
              btnColor={Global.colors.green}
              onPress={onSubmit}
            />
          </View>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          // onChange={handleSheetChanges}
        >
          <BottomSheetView style={style.contentContainer}>
            <Camera value={camera} setValue={setCamera} />
            <PickerImage value={image} setValue={setImage} />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const InputRenderer = ({
  value,
  setValue,
  label,
  editable = true,
}: {
  value: any;
  setValue: any;
  label: string;
  editable?: boolean;
}) => {
  return (
    <View>
      <Text style={{ paddingLeft: 15, color: Global.colors.gray }}>
        {label}
      </Text>
      <NormalTextInput
        value={value}
        setValue={setValue}
        placeholder={label}
        editable={editable}
      />
    </View>
  );
};

const screenHeight = Dimensions.get("window").height;

const style = StyleSheet.create({
  header: {
    width: "90%",
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
    height: screenHeight * 0.2,
  },
  middleContainer: {
    gap: 10,
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

  avatar: {
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 20,
    alignItems: "center",
  },
});

export default memo(Index);
