import { client } from "@/api/axios";
import { queryClient } from "@/api/query-client";
import { UserInfoContext } from "@/app/context/UserInfoContext";
import { useGetUserInfo } from "@/hooks/react-queries";
import Cookies from "js-cookie";
import { useEffect } from "react";

const UserInfoProvider = ({ children }) => {
  const {
    data: userInfoData,
    error: userInfoError,
    isLoading: userInfoLoading,
  } = useGetUserInfo();

  useEffect(() => {
    if (userInfoData) {
      Cookies.set("user-info", JSON.stringify(userInfoData), {
        expires: 1 / 24,
      });
    }
  }, [userInfoData]);

  return (
    <UserInfoContext.Provider
      value={{
        userInfo: userInfoData,
        isLoading: userInfoLoading,
        isError: userInfoError,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
