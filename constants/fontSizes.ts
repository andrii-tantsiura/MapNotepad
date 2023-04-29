const scaleCoefficient: number = 1.25;

export const fontSizes = {
  i10: {
    fontSize: 10 * scaleCoefficient,
  },
  i12: {
    fontSize: 12 * scaleCoefficient,
  },
  i14: {
    fontSize: 14 * scaleCoefficient,
  },
  i16: {
    fontSize: 16 * scaleCoefficient,
  },
  i18: {
    fontSize: 18 * scaleCoefficient,
  },
};

export interface IFontSizes {
  i10: number;
  i12: number;
  i14: number;
  i16: number;
  i18: number;
}
