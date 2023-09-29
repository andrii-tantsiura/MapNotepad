import { FC, useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { AppPalette } from "../../../constants";
import styles from "./styles";

interface ICustomSwitchProps {
  isActive?: boolean;
  activeColor?: string | number;
  inactiveColor?: string | number;
  onValueChanged?: (value: boolean) => void;
}

const maxInterpolatedValue = 22;

const circleHorizontalMargin = 1;
const inactiveCirclePosition = circleHorizontalMargin;
const activeCirclePosition =
  styles.container.width - styles.circle.width - circleHorizontalMargin;

export const CustomSwitch: FC<ICustomSwitchProps> = ({
  isActive = false,
  inactiveColor = AppPalette.systemLightGray,
  activeColor = AppPalette.lightPrimary,
  onValueChanged = () => {},
}) => {
  const progress = useDerivedValue(() =>
    withTiming(isActive ? maxInterpolatedValue : 0)
  );

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, maxInterpolatedValue],
      [inactiveColor, activeColor]
    );

    return {
      backgroundColor,
    };
  });

  const switchTranslate = useSharedValue(0);

  const customSpringStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(switchTranslate.value, {
          mass: 1,
          damping: 20,
          stiffness: 200,
          overshootClamping: false,
          restSpeedThreshold: 0.001,
          restDisplacementThreshold: 0.001,
        }),
      },
    ],
  }));

  useEffect(() => {
    switchTranslate.value = isActive
      ? activeCirclePosition
      : inactiveCirclePosition;
  }, [isActive, switchTranslate]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onValueChanged(!isActive);
      }}
    >
      <Animated.View style={[styles.container, backgroundColorStyle]}>
        <Animated.View style={[styles.circle, customSpringStyles]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
