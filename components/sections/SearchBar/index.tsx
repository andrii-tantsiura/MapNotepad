import { FC, useRef, useState } from "react";
import { TextInput, View, ViewStyle } from "react-native";
import { useSelector } from "react-redux";

import {
  CLEAR_ICON,
  EXIT_ICON,
  LEFT_BLUE_ICON,
  SETTINGS_ICON,
} from "../../../assets/icons";
import { ImageStyles, textStyle_i13 } from "../../../constants";
import { typographyStyleToTextStyle } from "../../../helpers";
import { setPinsSearchQueryAction } from "../../../store/redux/actions";
import { selectPinsSearch } from "../../../store/redux/slices";
import { useAppDispatch } from "../../../store/redux/store";
import { CustomButton } from "../../common";
import { Separator } from "../Separator";
import styles from "./styles";

interface ISearchBarProps {
  style?: ViewStyle;
  onRightButtonPress?: () => void;
}

export const SearchBar: FC<ISearchBarProps> = ({
  style,
  onRightButtonPress,
}) => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useSelector(selectPinsSearch);

  const textInputRef = useRef<TextInput | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isSearchActive = isFocused || searchQuery;

  const pinsSearchQueryChangeHandler = (text: string) => {
    dispatch(setPinsSearchQueryAction(text));
  };

  const clearTextHandler = () => {
    pinsSearchQueryChangeHandler("");
  };

  const endSearchHandler = () => {
    textInputRef.current?.blur();
    clearTextHandler();
  };

  const focusHandler = () => {
    setIsFocused(true);
  };

  const blurHandler = () => {
    setIsFocused(false);
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
            value={searchQuery}
            onBlur={blurHandler}
            onFocus={focusHandler}
            onChangeText={pinsSearchQueryChangeHandler}
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
