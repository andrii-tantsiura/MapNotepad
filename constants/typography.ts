import { scaleSize } from "../utils/dimensions";

interface FontFamily {
  fontFamily: string;
}

export interface IFontWeights {
  bold: FontFamily;
  semiBold: FontFamily;
  medium: FontFamily;
  regular: FontFamily;
}

export interface IFontSizes {
  i10: number;
  i12: number;
  i14: number;
  i16: number;
  i18: number;
}

export enum FontWeightAliases {
  Bold = "Montserrat-Bold",
  SemiBold = "Montserrat-SemiBold",
  Medium = "Montserrat-Medium",
  Regular = "Montserrat-Regular",
}

export const FontWeights: IFontWeights = {
  bold: {
    fontFamily: FontWeightAliases.Bold,
  },
  semiBold: {
    fontFamily: FontWeightAliases.SemiBold,
  },
  medium: {
    fontFamily: FontWeightAliases.Medium,
  },
  regular: {
    fontFamily: FontWeightAliases.Regular,
  },
};

export const FontSizes = {
  i10: {
    fontSize: scaleSize(10),
  },
  i12: {
    fontSize: scaleSize(12),
  },
  i14: {
    fontSize: scaleSize(14),
  },
  i16: {
    fontSize: scaleSize(16),
  },
  i18: {
    fontSize: scaleSize(18),
  },
};
