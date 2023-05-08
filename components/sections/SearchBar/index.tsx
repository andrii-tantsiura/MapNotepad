import { FC } from "react";
import { TextInput, View } from "react-native";
import { IconButton } from "../../common";
import styles from "./styles";

const SETTINGS_ICON = require("../../../assets/icons/ic_settings.png");
const EXIT_ICON = require("../../../assets/icons/ic_exit.png");

interface ISearchBarProps {
  onRightButtonPress?: () => void;
}

export const SearchBar: FC<ISearchBarProps> = ({ onRightButtonPress }) => (
  <View style={styles.container}>
    <IconButton style={styles.iconButton} source={SETTINGS_ICON} />
    <TextInput style={styles.input} placeholder="Search" />
    <IconButton
      style={styles.iconButton}
      source={EXIT_ICON}
      onPress={onRightButtonPress}
    />
  </View>
);
