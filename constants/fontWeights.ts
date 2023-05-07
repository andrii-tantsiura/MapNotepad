export const BOLD_FONT_FAMILY: string = "Montserrat-Bold";
export const SEMI_BOLD_FONT_FAMILY: string = "Montserrat-SemiBold";
export const MEDIUM_FONT_FAMILY: string = "Montserrat-Medium";
export const REGULAR_FONT_FAMILY: string = "Montserrat-Regular";

type FontFamily = { fontFamily: string };

export interface IFontWeights {
  bold: FontFamily;
  semiBold: FontFamily;
  medium: FontFamily;
  regular: FontFamily;
}

export const FontWeights: IFontWeights = {
  bold: {
    fontFamily: BOLD_FONT_FAMILY,
  },
  semiBold: {
    fontFamily: SEMI_BOLD_FONT_FAMILY,
  },
  medium: {
    fontFamily: MEDIUM_FONT_FAMILY,
  },
  regular: {
    fontFamily: REGULAR_FONT_FAMILY,
  },
};
