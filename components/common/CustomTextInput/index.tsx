import React, { useRef, useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";

import COLORS from "../../../constants/colors";
import { scaleSize } from "../../../utils/dimensions";
import { IconButton } from "../IconButton";
import { Typography } from "../Typography";
import styles from "./styles";

const CLEAR_ICON = require("../../../assets/icons/ic_clear.png");
const EYE_ICON = require("../../../assets/icons/ic_eye.png");
const EYE_ICON_OFF = require("../../../assets/icons/ic_eye_off.png");

export interface ICustomTextInputProps extends TextInputProps {
  title?: string;
  error?: string;
  onClear?: () => void;
}

export const CustomTextInput: React.FC<ICustomTextInputProps> = ({
  editable = true,
  autoCapitalize,
  placeholderTextColor = COLORS.systemGray,
  secureTextEntry = false,
  keyboardType = "default",
  title = " ",
  error,
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
  onClear,
}) => {
  const [isSecureText, setIsSecureText] = useState(secureTextEntry);
  const ref = useRef<TextInput>(null);

  const togglePasswordIcon = isSecureText ? EYE_ICON : EYE_ICON_OFF;
  const isButtonsShown = value && ref.current?.isFocused();

  const toggleIsSecureText = () => setIsSecureText(!isSecureText);

  return (
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
          ref={ref}
          style={styles.input}
          editable={editable}
          secureTextEntry={secureTextEntry && isSecureText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholderTextColor={placeholderTextColor}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onBlur={onBlur}
        />

        {isButtonsShown && (
          <View style={styles.buttonsContainer}>
            {secureTextEntry && (
              <IconButton
                style={styles.button}
                iconHeight={scaleSize(20)}
                iconWidth={scaleSize(20)}
                source={togglePasswordIcon}
                onPress={toggleIsSecureText}
              />
            )}

            <IconButton
              style={styles.button}
              iconHeight={scaleSize(20)}
              iconWidth={scaleSize(20)}
              source={CLEAR_ICON}
              onPress={onClear}
            />
          </View>
        )}
      </View>

      <Typography textStyle={styles.errorLabel}>{error}</Typography>
    </>
  );
};
