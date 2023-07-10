import {
  IFontHeights,
  IFontSizes,
  IFontWeights,
  ITypographyStyle,
} from "../../components/common/Typography/types";
import { scaleSize } from "../../utils";

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

// 700
const textStyle_i1: ITypographyStyle = {
  fontWeight: "bold",
  fontSize: "i18",
  lineHeight: "i27",
  color: "lightPrimary",
};

// 600
const textStyle_i2: ITypographyStyle = {
  fontWeight: "semiBold",
  fontSize: "i10",
  lineHeight: "i15",
  color: "lightError",
};

const textStyle_i3: ITypographyStyle = {
  fontWeight: "semiBold",
  fontSize: "i12",
  lineHeight: "i18",
  color: "lightPrimary",
};

const textStyle_i4: ITypographyStyle = {
  fontWeight: "semiBold",
  fontSize: "i14",
  lineHeight: "i21",
  color: "systemWhite",
};

const textStyle_i5: ITypographyStyle = {
  fontWeight: "semiBold",
  fontSize: "i14",
  lineHeight: "i21",
  color: "lightPrimary",
};

const textStyle_i6: ITypographyStyle = {
  fontWeight: "semiBold",
  fontSize: "i16",
  lineHeight: "i24",
  color: "systemBlack",
};

// 500
const textStyle_i7: ITypographyStyle = {
  fontWeight: "medium",
  fontSize: "i12",
  lineHeight: "i18",
  color: "systemDarkGray",
};

const textStyle_i8: ITypographyStyle = {
  fontWeight: "medium",
  fontSize: "i12",
  lineHeight: "i18",
  color: "systemLightGray",
};

const textStyle_i9: ITypographyStyle = {
  fontWeight: "medium",
  fontSize: "i14",
  lineHeight: "i21",
  color: "systemBlack",
};

// 400
const textStyle_i10: ITypographyStyle = {
  fontWeight: "regular",
  fontSize: "i12",
  lineHeight: "i18",
  color: "systemGray",
};

const textStyle_i11: ITypographyStyle = {
  fontWeight: "regular",
  fontSize: "i12",
  lineHeight: "i18",
  color: "systemDarkGray",
};

const textStyle_i12: ITypographyStyle = {
  fontWeight: "regular",
  fontSize: "i14",
  lineHeight: "i21",
  color: "systemGray",
};

export {
  textStyle_i1,
  textStyle_i2,
  textStyle_i3,
  textStyle_i4,
  textStyle_i5,
  textStyle_i6,
  textStyle_i7,
  textStyle_i8,
  textStyle_i9,
  textStyle_i10,
  textStyle_i11,
  textStyle_i12,
};
