import { FC, useEffect, useRef } from "react";
import { TextInput, View, ViewStyle } from "react-native";
import { useSelector } from "react-redux";

import {
  CLEAR_ICON,
  EXIT_ICON,
  LEFT_BLUE_ICON,
  SETTINGS_ICON,
} from "../../../assets/icons";
import { AppPalette, ImageSizes, textStyle_i13 } from "../../../constants";
import { typographyStyleToTextStyle } from "../../../helpers";
import { useAppTheme } from "../../../hooks";
import {
  setSearchQueryAction,
  startSearchAction,
  stopSearchAction,
} from "../../../store/redux/actions";
import { selectSearch } from "../../../store/redux/slices";
import { useAppDispatch } from "../../../store/redux/store";
import { Box, IconButton } from "../../common";
import { Separator } from "../Separator";
import styles from "./styles";

interface ISearchBarProps {
  style?: ViewStyle;
  onLeftButtonPress?: () => void;
  onRightButtonPress?: () => void;
}

export const SearchBar: FC<ISearchBarProps> = ({
  style,
  onLeftButtonPress,
  onRightButtonPress,
}) => {
  const { appColors } = useAppTheme();

  const dispatch = useAppDispatch();
  const { isActive, searchQuery } = useSelector(selectSearch);
  const textInputRef = useRef<TextInput | null>(null);

  const pinsSearchQueryChangeHandler = (text: string) => {
    dispatch(setSearchQueryAction(text));
  };

  const clearTextHandler = () => {
    dispatch(setSearchQueryAction(""));
  };

  const focusHandler = () => {
    dispatch(startSearchAction());
  };

  const stopSearchHandler = () => {
    textInputRef.current?.blur();

    dispatch(stopSearchAction());
  };

  useEffect(() => {
    if (!isActive) {
      textInputRef.current?.blur();
    }
  }, [isActive]);

  return (
    <>
      <View style={[styles.container, style]}>
        {isActive ? (
          <IconButton
            tintColor="primary"
            imageStyle={ImageSizes.medium}
            imageSource={LEFT_BLUE_ICON}
            onPress={stopSearchHandler}
          />
        ) : (
          <IconButton
            tintColor="primary"
            imageSource={SETTINGS_ICON}
            onPress={onLeftButtonPress}
          />
        )}

        <Box
          borderColor="variant"
          backgroundColor="variant"
          style={styles.inputContainer}
        >
          <TextInput
            ref={textInputRef}
            style={[
              styles.input,
              typographyStyleToTextStyle(textStyle_i13, appColors),
            ]}
            placeholder="Search"
            placeholderTextColor={AppPalette.systemGray}
            cursorColor={appColors.primary}
            selectionColor={appColors.primary}
            value={searchQuery}
            onFocus={focusHandler}
            onChangeText={pinsSearchQueryChangeHandler}
          />

          {isActive && (
            <IconButton
              imageStyle={ImageSizes.large}
              tintColor="primary"
              imageSource={CLEAR_ICON}
              onPress={clearTextHandler}
            />
          )}
        </Box>

        {!isActive && (
          <IconButton
            tintColor="primary"
            imageSource={EXIT_ICON}
            onPress={onRightButtonPress}
          />
        )}
      </View>

      <Separator />
    </>
  );
};
