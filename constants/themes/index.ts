import { AppThemes } from "../../enums";
import {
  IAppPalette,
  IAppTheme,
  IFlashMessageColors,
  IThemeSourceMapper,
} from "./types";

export const AppPalette: IAppPalette = {
  lightPrimary: "#596EFB",
  lightDisabled: "#C7CDF5",
  lightHoveredFocused: "#273BC6",
  lightPressed: "#192680",
  lightVariant: "#F1F3FD",
  darkPrimary: "#7485FB",
  darkDisabled: "#3D4475",
  darkHoveredFocused: "#5F73FA",
  darkPressed: "#3953FE",
  darkVariant: "#33374E",
  systemWhite: "#FEFEFD",
  systemLightGray: "#D7DDE8",
  systemGray: "#858E9E",
  systemDarkGray: "#3D4E61",
  systemDarkGray80: "#3d4e61CC",
  systemBlack: "#1E242B",
  lightError: "#F24545",
  darkError: "#FA545F",
  lightConfirm: "#F6EA62",
  darkConfirm: "#F8FD4D",
  lightSuccess: "#32D27F",
  darkSuccess: "#00FFB1",
  warning: "#F0AD4E",
  info: "#4ea2e1",
};

export const LightAppTheme: IAppTheme = {
  colors: {
    primary: AppPalette.lightPrimary,
    primaryText: AppPalette.systemBlack,
    secondaryText: AppPalette.systemDarkGray,
    background: AppPalette.systemWhite,
    disabled: AppPalette.lightDisabled,
    pressed: AppPalette.lightPressed,
    variant: AppPalette.lightVariant,
    systemWhite: AppPalette.systemWhite,
    systemLightGray: AppPalette.systemLightGray,
    systemGray: AppPalette.systemGray,
    systemDarkGray: AppPalette.systemDarkGray,
    systemDarkGray80: AppPalette.systemDarkGray80,
    systemBlack: AppPalette.systemBlack,
    error: AppPalette.lightError,
    confirm: AppPalette.lightConfirm,
    success: AppPalette.lightSuccess,
    warning: AppPalette.warning,
    info: AppPalette.info,
  },
  statusBrStyle: "dark",
};

export const DarkAppTheme: IAppTheme = {
  colors: {
    primary: AppPalette.darkPrimary,
    primaryText: AppPalette.systemWhite,
    secondaryText: AppPalette.systemLightGray,
    background: AppPalette.systemBlack,
    disabled: AppPalette.darkDisabled,
    pressed: AppPalette.darkPressed,
    variant: AppPalette.darkVariant,
    systemWhite: AppPalette.systemWhite,
    systemLightGray: AppPalette.systemLightGray,
    systemGray: AppPalette.systemGray,
    systemDarkGray: AppPalette.systemDarkGray,
    systemDarkGray80: AppPalette.systemDarkGray80,
    systemBlack: AppPalette.systemBlack,
    error: AppPalette.darkError,
    confirm: AppPalette.darkConfirm,
    success: AppPalette.darkSuccess,
    warning: AppPalette.warning,
    info: AppPalette.info,
  },
  statusBrStyle: "light",
};

export const ThemeSourceMapper: IThemeSourceMapper = {
  [AppThemes.Light]: LightAppTheme,
  [AppThemes.Dark]: DarkAppTheme,
};

export const FlashMessageColors: IFlashMessageColors = {
  info: AppPalette.info,
  success: AppPalette.lightSuccess,
  warning: AppPalette.warning,
  danger: AppPalette.lightError,
  none: AppPalette.warning,
  default: AppPalette.warning,
};
