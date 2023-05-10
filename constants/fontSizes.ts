import { scaleSize } from "../utils/dimensions";

export interface IFontSizes {
  i10: number;
  i12: number;
  i14: number;
  i16: number;
  i18: number;
}

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
