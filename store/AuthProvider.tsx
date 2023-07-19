import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, createContext, useState } from "react";

import { StorageItems } from "../enums";
import { ICredentials } from "../types";

interface IAuthContextProps {
  credentials: ICredentials | null;
  isAuthenticated: boolean;
  authenticate: (credentials: ICredentials) => void;
  logout: () => void;
  fetchCredentialsFromAsyncStorage: () => Promise<void>;
}

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContextProps>({
  credentials: null,
  isAuthenticated: false,
  authenticate: (credentials: ICredentials) => {},
  logout: () => {},
  fetchCredentialsFromAsyncStorage: () => new Promise<void>(() => {}),
});

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [credentials, setCredentials] = useState<ICredentials | null>(null);

  const value: IAuthContextProps = {
    credentials,
    isAuthenticated: Boolean(credentials),
    authenticate: async (credentials: ICredentials) => {
      const pairs: [string, string][] = [
        [StorageItems.ID_TOKEN, credentials.idToken],
        [StorageItems.EMAIL, credentials.email],
        [StorageItems.REFRESH_TOKEN, credentials.refreshToken],
        [StorageItems.EXPIRATION_DATE, credentials.expirationDate],
        [StorageItems.USER_ID, credentials.userId],
      ];

      await AsyncStorage.multiSet(pairs);

      setCredentials(credentials);
    },

    fetchCredentialsFromAsyncStorage: async () => {
      const values = await AsyncStorage.multiGet([
        StorageItems.ID_TOKEN,
        StorageItems.EMAIL,
        StorageItems.REFRESH_TOKEN,
        StorageItems.EXPIRATION_DATE,
        StorageItems.USER_ID,
      ]);

      setCredentials({
        idToken: values[0][1] ?? "",
        email: values[1][1] ?? "",
        refreshToken: values[2][1] ?? "",
        expirationDate: values[3][1] ?? "",
        userId: values[4][1] ?? "",
      });

      console.log("fetched credentials", credentials);
    },

    logout: async () => {
      await AsyncStorage.multiRemove([
        StorageItems.ID_TOKEN,
        StorageItems.EMAIL,
        StorageItems.REFRESH_TOKEN,
        StorageItems.EXPIRATION_DATE,
        StorageItems.USER_ID,
      ]);

      setCredentials(null);
    },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
