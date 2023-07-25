import React, { createContext } from "react";

export interface LoginContextType {
  handleLogin: (userId: string, token: string) => void;
}

const handleLogin = (userId: string, token: string): void => {
  localStorage.setItem("UserId", userId);
  localStorage.setItem("token", token);
};

export const LoginContext = createContext<LoginContextType>({
  handleLogin: handleLogin,
});

export const LoginProvider = (props: any) => {
  return (
    <LoginContext.Provider value={{ handleLogin }}>
      {props.children}
    </LoginContext.Provider>
  );
};
