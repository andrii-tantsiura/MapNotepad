import { useMemo } from "react";

import { AppThemes, ErrorMessages } from "../enums";
import { extractErrorMessage } from "../helpers";
import AlertService from "../services/AlertService";
import FirebaseErrorTranslator from "../services/ErrorTranslator/FirebaseErrorTranslator";
import { SettingsService } from "../services/SettingsService";
import { setAppThemeAction } from "../store/redux/actions";
import { useAppDispatch } from "../store/redux/store";
import { useAuth } from "./useAuth";

interface UseSettingsReturn {
  fetchSettings: () => Promise<void>;
  updateAppTheme: (theme: AppThemes) => Promise<void>;
}

export const useSettings = (): UseSettingsReturn => {
  const { credentials } = useAuth();
  const dispatch = useAppDispatch();

  const settingsService = useMemo(
    () =>
      new SettingsService(
        credentials?.userId ?? ErrorMessages.UNDEFINED_USER_ID
      ),
    [credentials]
  );

  const fetchSettings = async (): Promise<void> => {
    const result = await settingsService.getAppTheme();

    if (result.isSuccess) {
      if (result.data) {
        dispatch(setAppThemeAction(result.data));
      } else {
        AlertService.error(ErrorMessages.DATA_COULD_NOT_BE_RETRIEVED);
      }
    } else {
      const error = extractErrorMessage(result);

      AlertService.error(FirebaseErrorTranslator.translate(error));
    }
  };

  const updateAppTheme = async (theme: AppThemes): Promise<void> => {
    const result = await settingsService.updateAppTheme(theme);

    if (result.isSuccess) {
      dispatch(setAppThemeAction(theme));
    } else {
      const error = extractErrorMessage(result);

      AlertService.error(FirebaseErrorTranslator.translate(error));
    }
  };

  return {
    fetchSettings,
    updateAppTheme,
  };
};
