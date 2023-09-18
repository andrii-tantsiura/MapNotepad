import { useSelector } from "react-redux";

import { StorageItems } from "../enums";
import AlertService from "../services/AlertService";
import SecureStorageService from "../services/SecureStorageService";
import { loginAction, logoutAction } from "../store/redux/actions";
import { selectAuth } from "../store/redux/slices";
import { useAppDispatch } from "../store/redux/store";
import { ICredentialsModel } from "../types/models";

type UseAuthReturn = {
  credentials: ICredentialsModel | null;
  isAuthenticated: boolean;
  saveCredentialsToStorage: (credentials: ICredentialsModel) => Promise<void>;
  loginWithSavedCredentials: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuth = (): UseAuthReturn => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, credentials } = useSelector(selectAuth);

  const saveCredentialsToStorage = async (
    credentials: ICredentialsModel
  ): Promise<void> => {
    const keyValuePairs = [
      { key: StorageItems.FIREBASE_USER_ID, value: credentials.userId },
      { key: StorageItems.FIREBASE_TOKEN, value: credentials.token },
      {
        key: StorageItems.FIREBASE_REFRESH_TOKEN,
        value: credentials.refreshToken,
      },
      {
        key: StorageItems.FIREBASE_TOKEN_EXPIRATION_DATE,
        value: credentials.expirationDate,
      },
    ];

    const result = await SecureStorageService.multiSetAsync(keyValuePairs);

    if (result.isSuccess) {
      dispatch(loginAction(credentials));
    } else {
      AlertService.error(result.getMessage());
    }
  };

  const loginWithSavedCredentials = async (): Promise<void> => {
    const result = await SecureStorageService.multiGetAsync([
      StorageItems.FIREBASE_USER_ID,
      StorageItems.FIREBASE_TOKEN,
      StorageItems.FIREBASE_REFRESH_TOKEN,
      StorageItems.FIREBASE_TOKEN_EXPIRATION_DATE,
    ]);

    if (result.isSuccess && result.data?.every((x) => x.value)) {
      const credentials: ICredentialsModel = {
        userId: result.data[0].value ?? "defaultUserId",
        token: result.data[1].value ?? "defaultToken",
        refreshToken: result.data[2].value ?? "defaultRefreshToken",
        expirationDate: result.data[3].value ?? "defaultExpirationDate",
      };

      dispatch(loginAction(credentials));
    } else {
      AlertService.error(result.getMessage());
    }
  };

  const logout = async (): Promise<void> => {
    await SecureStorageService.multiDeleteAsync(Object.keys(StorageItems));

    dispatch(logoutAction());
  };

  return {
    credentials,
    isAuthenticated,
    saveCredentialsToStorage,
    loginWithSavedCredentials,
    logout,
  };
};
