export const BOLD_FONT_FAMILY: string = "Montserrat-Bold";
export const SEMI_BOLD_FONT_FAMILY: string = "Montserrat-SemiBold";
export const MEDIUM_FONT_FAMILY: string = "Montserrat-Medium";
export const REGULAR_FONT_FAMILY: string = "Montserrat-Regular";

export interface IFontWeights {
  bold: string;
  semiBold: string;
  regular: string;
  medium: string;
}

export const fontWeights = {
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
