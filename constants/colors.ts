export interface IAppColors {
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

interface IFlashMessageColors {
  info: string;
  success: string;
  warning: string;
  danger: string;
  none: string;
  default: string;
}

export const AppColors: IAppColors = {
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

export const Flash_Message_Colors: IFlashMessageColors = {
  info: AppColors.info,
  success: AppColors.lightSuccess,
  warning: AppColors.warning,
  danger: AppColors.lightError,
  none: AppColors.darkDisabled,
  default: AppColors.darkDisabled,
};
