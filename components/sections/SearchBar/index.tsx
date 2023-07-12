import { FC } from "react";
import { TextInput, View, ViewStyle } from "react-native";

import { EXIT_ICON, SETTINGS_ICON } from "../../../assets/icons";
import { textStyle_i12 } from "../../../constants";
import { typographyStyleToTextStyle } from "../../../helpers";
import { CustomButton } from "../../common";
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
      <CustomButton imageSource={SETTINGS_ICON} />

      <TextInput
        style={[styles.input, typographyStyleToTextStyle(textStyle_i12)]}
        placeholder="Search"
      />

      <CustomButton imageSource={EXIT_ICON} onPress={onRightButtonPress} />
    </View>

    <Separator />
  </>
);
