import { TextStyle } from "react-native";

import { IAppColors } from "../../../constants";

export interface IFontWeights {
  bold: string;
  semiBold: string;
  medium: string;
  regular: string;
}

export interface IFontSizes {
  i18: number;
  i16: number;
  i14: number;
  i12: number;
  i10: number;
}

export interface IFontHeights {
  i27: number;
  i24: number;
  i21: number;
  i18: number;
  i15: number;
}

export interface ITypographyStyle
  extends Omit<TextStyle, "fontWeight" | "fontSize" | "color" | "lineHeight"> {
  fontWeight?: keyof IFontWeights;
  fontSize?: keyof IFontSizes;
  color?: keyof IAppColors;
  lineHeight?: keyof IFontHeights;
}
