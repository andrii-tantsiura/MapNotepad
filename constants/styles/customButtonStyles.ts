import { ViewStyle } from "react-native";

import { CustomButtonStyle } from "../../components/common";
import { scaleSize } from "../../utils";
import { AppColors } from "../colors";
import { ShadowStyles } from "./globalStyles";
import { textStyle_i4, textStyle_i5 } from "./typographyStyles";

type CustomButtonStyles = {
  rectSolid_i1: CustomButtonStyle;
  rectOutline_i1: CustomButtonStyle;
  rectOutline_i2: CustomButtonStyle;
  roundFloating_i1: CustomButtonStyle;
  roundFloating_i2: CustomButtonStyle;
};

const floatingButtonStyle: ViewStyle = {
  position: "absolute",
  bottom: 0,
  right: 0,
};

const roundButtonStyle: ViewStyle = {
  marginRight: 16,
  marginBottom: 18,
  width: scaleSize(46),
  height: scaleSize(46),
  borderRadius: 30,
  backgroundColor: AppColors.systemWhite,
  ...ShadowStyles.shadow_i2,
};

const baseButtonStyle: ViewStyle = {
  height: scaleSize(40),
  borderWidth: 1,
  borderRadius: 1,
  borderColor: "transparent",
  backgroundColor: AppColors.systemWhite,
};

export const CustomButtonStyles: CustomButtonStyles = {
  rectSolid_i1: {
    containerStyle: {
      ...baseButtonStyle,
      backgroundColor: AppColors.lightPrimary,
    },
    textStyle: textStyle_i4,
  },
  rectOutline_i1: {
    containerStyle: {
      ...baseButtonStyle,
      borderColor: AppColors.lightPrimary,
    },
    textStyle: textStyle_i5,
  },
  rectOutline_i2: {
    containerStyle: {
      ...baseButtonStyle,
      borderColor: AppColors.systemLightGray,
    },
    textStyle: textStyle_i5,
  },
  roundFloating_i1: {
    containerStyle: {
      ...floatingButtonStyle,
      ...roundButtonStyle,
    },
  },
  roundFloating_i2: {
    containerStyle: {
      ...floatingButtonStyle,
      ...roundButtonStyle,
      backgroundColor: AppColors.lightPrimary,
    },
  },
};
