import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

import { StorageItems } from "../enums";
import { loginAction, logoutAction } from "../store/redux/actions";
import { selectAuth } from "../store/redux/slices";
import { useAppDispatch } from "../store/redux/store";
import { ICredentials } from "../types";

const credentialsKeys: StorageItems[] = [
  StorageItems.ID_TOKEN,
  StorageItems.EMAIL,
  StorageItems.REFRESH_TOKEN,
  StorageItems.EXPIRATION_DATE,
  StorageItems.USER_ID,
];

type UseAuthReturn = {
  credentials: ICredentials | null;
  isAuthenticated: boolean;
  login: (credentials: ICredentials) => Promise<void>;
  tryLoginFromWithSavedCredentials: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuth = (): UseAuthReturn => {
  const { isAuthenticated, credentials } = useSelector(selectAuth);
  const dispatch = useAppDispatch();

  const login = async (credentials: ICredentials): Promise<void> => {
    const pairs: [string, string][] = [
      [StorageItems.ID_TOKEN, credentials.idToken],
      [StorageItems.EMAIL, credentials.email],
      [StorageItems.REFRESH_TOKEN, credentials.refreshToken],
      [StorageItems.EXPIRATION_DATE, credentials.tokenLifeSpanInSeconds],
      [StorageItems.USER_ID, credentials.userId],
    ];

    await AsyncStorage.multiSet(pairs);

    dispatch(loginAction(credentials));
  };

  const tryLoginFromWithSavedCredentials = async (): Promise<void> => {
    const values = await AsyncStorage.multiGet(credentialsKeys);

    if (
      values[0][1] &&
      values[1][1] &&
      values[2][1] &&
      values[3][1] &&
      values[4][1]
    ) {
      const credentials = {
        idToken: values[0][1],
        email: values[1][1],
        refreshToken: values[2][1],
        tokenLifeSpanInSeconds: values[3][1],
        userId: values[4][1],
      };

      dispatch(loginAction(credentials));
    }
  };

  const logout = async (): Promise<void> => {
    await AsyncStorage.multiRemove(credentialsKeys);

    dispatch(logoutAction());
  };

  return {
    credentials,
    isAuthenticated,
    login,
    tryLoginFromWithSavedCredentials,
    logout,
  };
};
