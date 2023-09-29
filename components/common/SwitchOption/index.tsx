import React, { FC } from "react";
import { View } from "react-native";

import { textStyle_i14 } from "../../../constants";
import { CustomSwitch } from "../CustomSwitch";
import { Typography } from "../Typography";
import styles from "./styles";

interface ISwitchedOptionProps {
  title: string;
  isActive: boolean;
  onValueChanged: () => void;
}

export const SwitchOption: FC<ISwitchedOptionProps> = React.memo(
  ({ title, isActive, onValueChanged }) => (
    <View style={styles.container}>
      <Typography style={textStyle_i14}>{title}</Typography>

      <CustomSwitch isActive={isActive} onValueChanged={onValueChanged} />
    </View>
  )
);
