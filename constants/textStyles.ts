import { scaleSize } from "../utils/dimensions";

type FontFamily = {
  fontFamily: string;
};

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

export enum FontWeightValues {
  Bold = "Montserrat-Bold",
  SemiBold = "Montserrat-SemiBold",
  Medium = "Montserrat-Medium",
  Regular = "Montserrat-Regular",
}

export const FontWeights: IFontWeights = {
  bold: {
    fontFamily: FontWeightValues.Bold,
  },
  semiBold: {
    fontFamily: FontWeightValues.SemiBold,
  },
  medium: {
    fontFamily: FontWeightValues.Medium,
  },
  regular: {
    fontFamily: FontWeightValues.Regular,
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
