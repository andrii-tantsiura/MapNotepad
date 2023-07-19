import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, createContext, useState } from "react";

import { StorageItems } from "../enums";
import { ICredentials } from "../types";

const credentialsKeys: StorageItems[] = [
  StorageItems.ID_TOKEN,
  StorageItems.EMAIL,
  StorageItems.REFRESH_TOKEN,
  StorageItems.EXPIRATION_DATE,
  StorageItems.USER_ID,
];

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
        [StorageItems.EXPIRATION_DATE, credentials.tokenLifeSpanInSeconds],
        [StorageItems.USER_ID, credentials.userId],
      ];

      await AsyncStorage.multiSet(pairs);

      setCredentials(credentials);
    },

    fetchCredentialsFromAsyncStorage: async () => {
      const values = await AsyncStorage.multiGet(credentialsKeys);

      if (
        values[0][1] &&
        values[1][1] &&
        values[2][1] &&
        values[3][1] &&
        values[4][1]
      ) {
        setCredentials({
          idToken: values[0][1],
          email: values[1][1],
          refreshToken: values[2][1],
          tokenLifeSpanInSeconds: values[3][1],
          userId: values[4][1],
        });
      }
    },

    logout: async () => {
      await AsyncStorage.multiRemove(credentialsKeys);

      setCredentials(null);
    },
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
