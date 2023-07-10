import React, { useState } from "react";
import {
  Control,
  Controller,
  UseControllerProps,
  UseFormResetField,
} from "react-hook-form";
import { TextInput, TextInputProps, View } from "react-native";

import { CLEAR_ICON, EYE_ICON, EYE_OFF_ICON } from "../../../assets/icons";
import {
  AppColors,
  ImageStyles,
  textStyle_i2,
  textStyle_i7,
  textStyle_i9,
} from "../../../constants";
import { typographyStyleToTextStyle } from "../../../helpers";
import { CustomButton } from "../CustomButton";
import { Typography } from "../Typography";
import styles from "./styles";

interface IValidatedInputTextProps extends TextInputProps {
  name: string;
  control: Control<any, any>;
  rules?: UseControllerProps["rules"];
  resetField: UseFormResetField<any>;
  title?: string;
}

export const ValidatedInputText: React.FC<IValidatedInputTextProps> = ({
  name,
  control,
  rules = {},
  resetField,
  title = " ",
  placeholder,
  autoFocus,
  editable = true,
  autoCapitalize,
  placeholderTextColor = AppColors.systemGray,
  secureTextEntry = false,
  keyboardType = "default",
  maxLength,
  onSubmitEditing,
  onFocus,
}) => {
  const [isSecureText, setIsSecureText] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const passwordIcon = isSecureText ? EYE_ICON : EYE_OFF_ICON;

  const toggleIsSecureText = () => setIsSecureText(!isSecureText);
  const clearHandler = () => resetField(name);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange: onFieldChange, onBlur: onFieldBlur },
        fieldState: { error },
      }) => (
        <>
          <Typography style={textStyle_i7}>{title}</Typography>

          <View
            style={[
              styles.inputContainer,
              Boolean(error) && styles.errorInputContainer,
            ]}
          >
            <TextInput
              style={[styles.input, typographyStyleToTextStyle(textStyle_i9)]}
              editable={editable}
              maxLength={maxLength}
              secureTextEntry={secureTextEntry && isSecureText}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              placeholderTextColor={placeholderTextColor}
              placeholder={placeholder}
              value={value}
              onChangeText={onFieldChange}
              onSubmitEditing={onSubmitEditing}
              onFocus={(e) => {
                onFocus?.(e);
                setIsFocused(true);
              }}
              onBlur={() => {
                setIsFocused(false);
                onFieldBlur();
              }}
              autoFocus={autoFocus}
            />

            {value && isFocused && (
              <View style={styles.buttonsContainer}>
                {secureTextEntry && (
                  <CustomButton
                    iconStyle={ImageStyles.i2}
                    imageSource={passwordIcon}
                    onPress={toggleIsSecureText}
                  />
                )}

                <CustomButton
                  iconStyle={ImageStyles.i2}
                  imageSource={CLEAR_ICON}
                  onPress={clearHandler}
                />
              </View>
            )}
          </View>

          <Typography style={textStyle_i2}>{error?.message}</Typography>
        </>
      )}
    />
  );
};
