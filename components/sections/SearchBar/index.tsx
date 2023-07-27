import { FC, useRef, useState } from "react";
import { TextInput, View, ViewStyle } from "react-native";

import { CLEAR_ICON, EXIT_ICON, SETTINGS_ICON } from "../../../assets/icons";
import { ImageStyles, textStyle_i13 } from "../../../constants";
import { typographyStyleToTextStyle } from "../../../helpers";
import { CustomButton } from "../../common";
import { Separator } from "../Separator";
import styles from "./styles";

interface ISearchBarProps {
  value?: string;
  style?: ViewStyle;
  onRightButtonPress?: () => void;
  onChangeText: (text: string) => void;
}

export const SearchBar: FC<ISearchBarProps> = ({
  style,
  value,
  onRightButtonPress,
  onChangeText,
}) => {
  const textInputRef = useRef<TextInput | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const clearHandler = () => {
    onChangeText("");
  };

  return (
    <>
      <View style={[styles.container, style]}>
        <CustomButton imageSource={SETTINGS_ICON} />

        <View style={styles.inputContainer}>
          <TextInput
            ref={textInputRef}
            style={[styles.input, typographyStyleToTextStyle(textStyle_i13)]}
            placeholder="Search"
            value={value}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            onChangeText={onChangeText}
          />

          {isFocused && (
            <CustomButton
              iconStyle={ImageStyles.i2}
              imageSource={CLEAR_ICON}
              onPress={clearHandler}
            />
          )}
        </View>

        {!isFocused && (
          <CustomButton imageSource={EXIT_ICON} onPress={onRightButtonPress} />
        )}
      </View>

      <Separator />
    </>
  );
};
