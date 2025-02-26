import { createContext, useContext } from "react";

export interface UserInfoContextType {
  userInfo: any;
  isLoading: boolean;
  isError: any;
}

const UserInfoContext = createContext<UserInfoContextType | null>(null);

const useUserInfo = () => {
  if (!UserInfoContext) {
    throw new Error("UserInfoContext has to be used within Provider");
  }
  return useContext(UserInfoContext);
};

export { UserInfoContext, useUserInfo };
