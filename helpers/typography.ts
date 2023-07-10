import { StyleProp, TextStyle } from "react-native";

import { ITypographyStyle } from "../components/common/Typography/types";
import { FontHeights, FontSizes, FontWeights } from "../constants";
import COLORS from "../constants/colors";

export const typographyStyleToTextStyle = (
  style: StyleProp<ITypographyStyle>
): TextStyle => {
  let customStyle: TextStyle = {};

  if (style) {
    let unionStyles: ITypographyStyle = {};

    if (Array.isArray(style)) {
      unionStyles = Object.assign({}, ...style);
    } else if (typeof style === "object") {
      unionStyles = style;
    }

    const { lineHeight, fontWeight, fontSize, color, ...restStyleAttributes } =
      unionStyles;

    const specificStyle: TextStyle = {
      lineHeight: lineHeight && FontHeights[lineHeight],
      fontFamily: fontWeight && FontWeights[fontWeight],
      fontSize: fontSize && FontSizes[fontSize],
      color: color && COLORS[color],
    };

    customStyle = Object.assign(restStyleAttributes, specificStyle);
  }

  return customStyle;
};
