import { useUser } from "@clerk/clerk-expo";
import axios from "axios";
import React, { createContext, useState } from "react";
import { showMessage } from "react-native-flash-message";

import uriToBase64 from "../utils/uriToBase64.ts";

import { API } from "@/config";

interface GlobalContextInterface {
  user: string | undefined;
  setUser: (user: string) => void;
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
  request: (arg: Props) => Promise<any>;
  data: Record<string, any>;
  updateData: (key: string, newData: any) => void;
}

type Props = {
  method?: string;
  url: string;
  isNotification?: boolean;
  useLoading?: boolean;
  body?: object | null | any;
  model: string;
  storeContext?: boolean;
};

const GlobalContext = createContext<GlobalContextInterface>(
  {} as GlobalContextInterface,
);

const GlobalProvider = (props: React.PropsWithChildren<any>) => {
  const id = useUser()?.user?.id;
  const [user, setUser] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Record<string, any>>({});

  const [userInfo, setUserInfo] = useState<any>();

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const updateData = (key: string, newData: any) => {
    setData((prev) => ({
      ...prev,
      [key]: newData,
    }));
  };

  const request = async ({
    method = "POST",
    url,
    isNotification = false,
    body = null,
    useLoading = true,
    model,
    storeContext = true,
  }: Props) => {
    if (useLoading) {
      startLoading();
    }
    let result = null;
    try {
      const image = body?.image ? await uriToBase64(body.image) : null;

      console.log("🚀 ~ GlobalProvider ~ url:", API + url + "  " + method);

      const response = await axios({
        method,
        url: API + url,
        responseEncoding: "utf8",
        data: method !== "GET" ? { ...body, user: id, image } : undefined,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
      if (response) {
        result = response?.data;
        if (result) {
          if (storeContext && model !== "delete") {
            updateData(model, result?.data);
          }
          if (isNotification) {
            showMessage({
              icon: result?.success ? "success" : "warning",
              message:
                result?.message ||
                (result?.success ? "Амжилттай" : "Амжилтгүй"),
              type: result?.success ? "success" : "warning",
            });
          }
        }
        if (!result) {
          showMessage({
            icon: "warning",
            message: "Хүсэлт илгээхэд алдаа гарлаа",
            type: "danger",
          });
        }
      }
    } catch (error) {
      if (isNotification) {
        showMessage({
          icon: "warning",
          message: "Хүсэлт илгээхэд алдаа гарлаа",
          type: "danger",
        });
      }
    } finally {
      if (useLoading) {
        stopLoading();
      }
    }
    return result;
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        userInfo,
        setUserInfo,
        loading,
        setLoading,
        startLoading,
        stopLoading,
        request,
        data,
        updateData,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
