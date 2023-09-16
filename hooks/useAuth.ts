import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

import { StorageItems } from "../enums";
import { loginAction, logoutAction } from "../store/redux/actions";
import { selectAuth } from "../store/redux/slices";
import { useAppDispatch } from "../store/redux/store";
import { ICredentialsModel } from "../types/models";
import AlertService from "../services/AlertService";

const credentialsKeys: StorageItems[] = [
  StorageItems.ID_TOKEN,
  StorageItems.REFRESH_TOKEN,
  StorageItems.EXPIRATION_DATE,
  StorageItems.USER_ID,
];

type UseAuthReturn = {
  credentials: ICredentialsModel | null;
  isAuthenticated: boolean;
  login: (credentials: ICredentialsModel) => Promise<void>;
  tryLoginFromWithSavedCredentials: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuth = (): UseAuthReturn => {
  const { isAuthenticated, credentials } = useSelector(selectAuth);
  const dispatch = useAppDispatch();

  const login = async (credentials: ICredentialsModel): Promise<void> => {
    const pairs: [string, string][] = [
      [StorageItems.ID_TOKEN, credentials.idToken],
      [StorageItems.REFRESH_TOKEN, credentials.refreshToken],
      [StorageItems.EXPIRATION_DATE, credentials.tokenLifeSpanInSeconds],
      [StorageItems.USER_ID, credentials.userId],
    ];

    try {
      await AsyncStorage.multiSet(pairs);
    } catch (e) {
      AlertService.error("Cannot get auth data from storage");
    }

    dispatch(loginAction(credentials));
  };

  const tryLoginFromWithSavedCredentials = async (): Promise<void> => {
    try {
      const values = await AsyncStorage.multiGet(credentialsKeys);

      if (values[0][1] && values[1][1] && values[2][1] && values[3][1]) {
        const credentials = {
          idToken: values[0][1],
          refreshToken: values[1][1],
          tokenLifeSpanInSeconds: values[2][1],
          userId: values[3][1],
        };

        dispatch(loginAction(credentials));
      }
    } catch (e) {
      AlertService.error("Cannot get auth data from storage");
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove(credentialsKeys);

      dispatch(logoutAction());
    } catch (e) {}
  };

  return {
    credentials,
    isAuthenticated,
    login,
    tryLoginFromWithSavedCredentials,
    logout,
  };
};
