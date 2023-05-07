export interface IFontSizes {
  i10: number;
  i12: number;
  i14: number;
  i16: number;
  i18: number;
}

const SCALE_COEFFICIENT: number = 1.2;

export const FontSizes = {
  i10: {
    fontSize: 10 * SCALE_COEFFICIENT,
  },
  i12: {
    fontSize: 12 * SCALE_COEFFICIENT,
  },
  i14: {
    fontSize: 14 * SCALE_COEFFICIENT,
  },
  i16: {
    fontSize: 16 * SCALE_COEFFICIENT,
  },
  i18: {
    fontSize: 18 * SCALE_COEFFICIENT,
  },
};
