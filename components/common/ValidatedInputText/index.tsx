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
import { AppColors, ImageStyles, textStyle_i9 } from "../../../constants";
import { typographyStyleToTextStyle } from "../../../helpers";
import { CustomButton } from "../CustomButton";
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
  placeholderTextColor = AppColors.systemGray,
  onFocus,
  secureTextEntry,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isTextHidden, setIsTextHidden] = useState(secureTextEntry);

  const passwordIcon = isTextHidden ? EYE_ICON : EYE_OFF_ICON;

  const textStyles = [
    styles.input,
    textInputStyle,
    typographyStyleToTextStyle(textStyle),
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
          cursorColor: AppColors.primary,
          selectionColor: AppColors.primary,
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
          (Boolean(error) && styles.errorInputContainer) ||
            (isFocused && styles.focusedInputContainer),
        ];

        return (
          <View style={containerStyle}>
            <TextInput {...textInputProps} />

            {secureTextEntry && value && (
              <CustomButton
                containerStyle={styles.toggleHiddenButton}
                iconStyle={ImageStyles.i2}
                imageSource={passwordIcon}
                onPress={toggleIsTextHidden}
              />
            )}

            {value && (
              <CustomButton
                containerStyle={styles.clearButton}
                iconStyle={ImageStyles.i2}
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
