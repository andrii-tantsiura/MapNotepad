import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, createContext, useState } from "react";

interface IAuthContextProps {
  token: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
  fetchTokenFromStorageAsync: () => Promise<void>;
}

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContextProps>({
  token: null,
  isAuthenticated: false,
  authenticate: (token: string) => {},
  logout: () => {},
  fetchTokenFromStorageAsync: () => new Promise<void>(() => {}),
});

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const value: IAuthContextProps = {
    token: null,
    isAuthenticated: Boolean(token),
    authenticate: (token: string | null) => {
      AsyncStorage.setItem("token", token ?? "");
      setToken(token);
    },

    fetchTokenFromStorageAsync: async () => {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);
      }
    },

    logout: () => {
      AsyncStorage.removeItem("token");
      setToken(null);
    },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};