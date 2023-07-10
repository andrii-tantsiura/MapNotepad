import {
  IFontHeights,
  IFontSizes,
  IFontWeights,
} from "../components/common/Typography/types";
import { scaleSize } from "../utils/dimensions";

export enum FontWeightAliases {
  Bold = "Montserrat-Bold",
  SemiBold = "Montserrat-SemiBold",
  Medium = "Montserrat-Medium",
  Regular = "Montserrat-Regular",
}

export const FontWeights: IFontWeights = {
  bold: FontWeightAliases.Bold,
  semiBold: FontWeightAliases.SemiBold,
  medium: FontWeightAliases.Medium,
  regular: FontWeightAliases.Regular,
};

export const FontSizes: IFontSizes = {
  i18: scaleSize(18),
  i16: scaleSize(16),
  i14: scaleSize(14),
  i12: scaleSize(12),
  i10: scaleSize(10),
};

export const FontHeights: IFontHeights = {
  i27: scaleSize(27),
  i24: scaleSize(24),
  i21: scaleSize(21),
  i18: scaleSize(18),
  i15: scaleSize(15),
};
