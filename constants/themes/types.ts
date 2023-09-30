import { AppThemes } from "../../enums";

export interface IAppPalette {
  lightPrimary: string;
  lightDisabled: string;
  lightHoveredFocused: string;
  lightPressed: string;
  lightVariant: string;
  darkPrimary: string;
  darkDisabled: string;
  darkHoveredFocused: string;
  darkPressed: string;
  darkVariant: string;
  systemWhite: string;
  systemLightGray: string;
  systemDarkGray80: string;
  systemGray: string;
  systemDarkGray: string;
  systemBlack: string;
  lightError: string;
  darkError: string;
  lightConfirm: string;
  darkConfirm: string;
  lightSuccess: string;
  darkSuccess: string;
  warning: string;
  info: string;
}

export interface IAppColors {
  primaryText: string;
  secondaryText: string;
  primary: string;
  background: string;
  disabled: string;
  pressed: string;
  variant: string;
  systemWhite: string;
  systemLightGray: string;
  systemDarkGray80: string;
  systemGray: string;
  systemDarkGray: string;
  systemBlack: string;
  error: string;
  confirm: string;
  success: string;
  warning: string;
  info: string;
}

export interface IAppTheme {
  colors: IAppColors;
}

export interface IThemeSourceMapper extends Record<AppThemes, IAppTheme> {}

export interface IFlashMessageColors {
  info: string;
  success: string;
  warning: string;
  danger: string;
  none: string;
  default: string;
}
