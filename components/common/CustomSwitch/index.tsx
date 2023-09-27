import { FC } from "react";

import { Pressable, View } from "react-native";
import styles from "./styles";

interface ICustomSwitchProps {
  value?: boolean;
  onValueChanged?: (value: boolean) => void;
}

export const CustomSwitch: FC<ICustomSwitchProps> = ({
  value,

  onValueChanged,
}) => {
  const thumbStyle = [styles.thumb, value && styles.thumbToggled];

  return (
    <Pressable style={styles.track} onPress={() => onValueChanged?.(!value)}>
      <View style={thumbStyle} />
    </Pressable>
  );
};
