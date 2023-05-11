import React, { useState } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import styles from "./styles";
import COLORS from "../../../constants/colors";
import { Typography } from "../Typography";
import { IconButton } from "../IconButton";
import { scaleSize } from "../../../utils/dimensions";
import {
  Control,
  Controller,
  UseControllerProps,
  UseFormResetField,
} from "react-hook-form";

const CLEAR_ICON = require("../../../assets/icons/ic_clear.png");
const EYE_ICON = require("../../../assets/icons/ic_eye.png");
const EYE_ICON_OFF = require("../../../assets/icons/ic_eye_off.png");

export interface IInputTextProps extends TextInputProps {
  name: string;
  control: Control<any, any>;
  rules?: UseControllerProps["rules"];
  resetField: UseFormResetField<any>;
  title?: string;
}

export const ValidateInputText: React.FC<IInputTextProps> = ({
  name,
  control,
  rules = {},
  resetField,
  editable = true,
  autoCapitalize,
  placeholderTextColor = COLORS.systemGray,
  secureTextEntry = false,
  keyboardType = "default",
  title = " ",
  placeholder,
  onSubmitEditing,
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
        field: { value, onChange, onBlur },
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
              secureTextEntry={secureTextEntry && isSecureText}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              placeholderTextColor={placeholderTextColor}
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onSubmitEditing={onSubmitEditing}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                onBlur();
              }}
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
