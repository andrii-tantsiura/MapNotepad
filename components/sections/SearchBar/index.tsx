import { FC } from "react";
import { TextInput, View, ViewStyle } from "react-native";

import { EXIT_ICON, SETTINGS_ICON } from "../../../assets/icons";
import { IconButton } from "../../common";
import { Separator } from "../Separator";
import styles from "./styles";

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
