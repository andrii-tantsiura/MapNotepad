import React, { useState } from "react";
import {
  Control,
  Controller,
  UseControllerProps,
  UseFormResetField,
} from "react-hook-form";
import { TextInput, TextInputProps, View } from "react-native";

import COLORS from "../../../constants/colors";
import { scaleSize } from "../../../utils/dimensions";
import { IconButton } from "../IconButton";
import { Typography } from "../Typography";
import styles from "./styles";

const CLEAR_ICON = require("../../../assets/icons/ic_clear.png");
const EYE_ICON = require("../../../assets/icons/ic_eye.png");
const EYE_ICON_OFF = require("../../../assets/icons/ic_eye_off.png");

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
  placeholderTextColor = COLORS.systemGray,
  secureTextEntry = false,
  keyboardType = "default",
  maxLength,
  onSubmitEditing,
  onFocus,
}) => {
  const [isSecureText, setIsSecureText] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const passwordIcon = isSecureText ? EYE_ICON : EYE_ICON_OFF;

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
          <Typography textAlign="left" textStyle={styles.titleLabel}>
            {title}
          </Typography>

          <View
            style={[
              styles.inputContainer,
              Boolean(error) && styles.errorInputContainer,
            ]}
          >
            <TextInput
              style={styles.input}
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
                  <IconButton
                    style={styles.button}
                    iconHeight={scaleSize(20)}
                    iconWidth={scaleSize(20)}
                    source={passwordIcon}
                    onPress={toggleIsSecureText}
                  />
                )}

                <IconButton
                  style={styles.button}
                  iconHeight={scaleSize(20)}
                  iconWidth={scaleSize(20)}
                  source={CLEAR_ICON}
                  onPress={clearHandler}
                />
              </View>
            )}
          </View>

          <Typography textStyle={styles.errorLabel}>
            {error?.message}
          </Typography>
        </>
      )}
    />
  );
};
