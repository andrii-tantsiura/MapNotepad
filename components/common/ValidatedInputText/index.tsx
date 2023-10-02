import React, { useState } from "react";
import {
  Control,
  Controller,
  UseControllerProps,
  UseFormResetField,
} from "react-hook-form";
import { UseFormTrigger } from "react-hook-form/dist/types";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { CLEAR_ICON, EYE_ICON, EYE_OFF_ICON } from "../../../assets/icons";
import { AppPalette, ImageSizes, textStyle_i9 } from "../../../constants";
import { typographyStyleToTextStyle } from "../../../helpers";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { IconButton } from "../IconButton";
import { ITypographyStyle } from "../Typography/types";
import styles from "./styles";

export type IFormController = {
  control: Control<any, any>;
  trigger: UseFormTrigger<any>;
  resetField: UseFormResetField<any>;
};

export interface IValidatedInputTextProps extends TextInputProps {
  name: string;
  formController: IFormController;
  rules?: UseControllerProps["rules"];
  style?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<ITypographyStyle>;
}

export const ValidatedInputText: React.FC<IValidatedInputTextProps> = ({
  name,
  formController: { control, trigger, resetField },
  rules = {},
  style,
  textInputStyle,
  textStyle = textStyle_i9,
  placeholderTextColor = AppPalette.systemGray,
  onFocus,
  secureTextEntry,
  ...restProps
}) => {
  const { appColors } = useAppTheme();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isTextHidden, setIsTextHidden] = useState(secureTextEntry);

  const passwordIcon = isTextHidden ? EYE_ICON : EYE_OFF_ICON;

  const textStyles = [
    styles.input,
    textInputStyle,
    typographyStyleToTextStyle(textStyle, appColors),
  ];

  const toggleIsTextHidden = () => {
    setIsTextHidden(!isTextHidden);
  };

  const clearTextHandler = () => {
    resetField(name);
    trigger(name);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        const textInputProps: TextInputProps = {
          ...restProps,
          style: textStyles,
          cursorColor: appColors.primary,
          selectionColor: appColors.primary,
          placeholderTextColor: placeholderTextColor,
          secureTextEntry: isTextHidden,
          value: value,
          onChangeText: onChange,
          onFocus: (e) => {
            onFocus?.(e);
            setIsFocused(true);
          },
          onBlur: () => {
            onBlur();
            setIsFocused(false);
          },
        };

        const containerStyle = [
          styles.inputContainer,
          style,
          (Boolean(error) && { borderColor: appColors.error }) ||
            (isFocused && styles.focusedInputContainer),
        ];

        return (
          <View style={containerStyle}>
            <TextInput {...textInputProps} />

            {secureTextEntry && value && (
              <IconButton
                tintColor="primary"
                imageStyle={ImageSizes.large}
                imageSource={passwordIcon}
                onPress={toggleIsTextHidden}
              />
            )}

            {value && (
              <IconButton
                tintColor="primary"
                imageStyle={ImageSizes.large}
                imageSource={CLEAR_ICON}
                onPress={clearTextHandler}
              />
            )}
          </View>
        );
      }}
    />
  );
};
