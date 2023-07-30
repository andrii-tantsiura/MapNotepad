import { FC, useRef, useState } from "react";
import { TextInput, View, ViewStyle } from "react-native";

import {
  CLEAR_ICON,
  EXIT_ICON,
  LEFT_BLUE_ICON,
  SETTINGS_ICON,
} from "../../../assets/icons";
import { ImageStyles, textStyle_i13 } from "../../../constants";
import { typographyStyleToTextStyle } from "../../../helpers";
import { CustomButton } from "../../common";
import { Separator } from "../Separator";
import styles from "./styles";

interface ISearchBarProps {
  value?: string;
  style?: ViewStyle;
  onRightButtonPress?: () => void;
  onTextChange: (text: string) => void;
  onFocusChange: (isFocused: boolean) => void;
}

export const SearchBar: FC<ISearchBarProps> = ({
  style,
  value,
  onRightButtonPress,
  onTextChange,
  onFocusChange,
}) => {
  const textInputRef = useRef<TextInput | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isSearchActive = isFocused || value;

  const clearTextHandler = () => {
    onTextChange("");
  };

  const endSearchHandler = () => {
    textInputRef.current?.blur();
    clearTextHandler();
  };

  const focusHandler = () => {
    setIsFocused(true);
    onFocusChange(true);
  };

  const blurHandler = () => {
    setIsFocused(false);
    onFocusChange(false);
  };

  return (
    <>
      <View style={[styles.container, style]}>
        {isSearchActive ? (
          <CustomButton
            imageSource={LEFT_BLUE_ICON}
            onPress={endSearchHandler}
          />
        ) : (
          <CustomButton imageSource={SETTINGS_ICON} />
        )}

        <View style={styles.inputContainer}>
          <TextInput
            ref={textInputRef}
            style={[styles.input, typographyStyleToTextStyle(textStyle_i13)]}
            placeholder="Search"
            value={value}
            onBlur={blurHandler}
            onFocus={focusHandler}
            onChangeText={onTextChange}
          />

          {isSearchActive && (
            <CustomButton
              iconStyle={ImageStyles.i2}
              imageSource={CLEAR_ICON}
              onPress={clearTextHandler}
            />
          )}
        </View>

        {!isSearchActive && (
          <CustomButton imageSource={EXIT_ICON} onPress={onRightButtonPress} />
        )}
      </View>

      <Separator />
    </>
  );
};
