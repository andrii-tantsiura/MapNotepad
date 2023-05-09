import { FC } from "react";
import { TextInput, View, ViewStyle } from "react-native";
import { IconButton } from "../../common";
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
  <View style={[styles.container, style]}>
    <IconButton iconHeight={28} iconWidth={28} source={SETTINGS_ICON} />
    <TextInput style={styles.input} placeholder="Search" />
    <IconButton
      iconHeight={28}
      iconWidth={28}
      source={EXIT_ICON}
      onPress={onRightButtonPress}
    />
  </View>
);
