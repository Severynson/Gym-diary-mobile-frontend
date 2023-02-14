import { createContext, FC, ReactNode, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type authContextType = {
  token: string;
  isAuthenticated: boolean;
  authenticate: (token: string) => "void";
  logout: () => void;
};

export const authContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token: string): void => {},
  logout: (): void => {},
} as authContextType);

interface AuthContextProviderProps {
  children: ReactNode | JSX.Element;
}

const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}): JSX.Element => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  function authenticate(token: string) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  } as authContextType;

  return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
