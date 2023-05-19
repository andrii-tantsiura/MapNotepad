import { FC } from "react";
import { TextInput, View, ViewStyle } from "react-native";

import { IconButton, Separator } from "../../common";
import styles from "./styles";

const SETTINGS_ICON = require("../../../assets/icons/ic_settings.png");
const EXIT_ICON = require("../../../assets/icons/ic_exit.png");

interface ISearchBarProps {
  onRightButtonPress?: () => void;
  style?: ViewStyle;
}

export const SearchBar: FC<ISearchBarProps> = ({
  style,
  onRightButtonPress,
}) => (
  <>
    <View style={[styles.container, style]}>
      <IconButton source={SETTINGS_ICON} />

      <TextInput style={styles.input} placeholder="Search" />

      <IconButton source={EXIT_ICON} onPress={onRightButtonPress} />
    </View>

    <Separator />
  </>
);
