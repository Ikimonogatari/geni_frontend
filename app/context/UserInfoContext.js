import React, { createContext, useContext, useState } from "react";

const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [shouldRefetchUserInfo, setShouldRefetchUserInfo] = useState(false);

  return (
    <UserInfoContext.Provider
      value={{ shouldRefetchUserInfo, setShouldRefetchUserInfo }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => useContext(UserInfoContext);
