import React, { useRef, useState } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import styles from "./styles";
import COLORS from "../../../constants/colors";
import { Typography } from "../Typography";
import { IconButton } from "../IconButton";

const CLEAR_ICON = require("../../../assets/icons/ic_clear.png");
const EYE_ICON = require("../../../assets/icons/ic_eye.png");
const EYE_ICON_OFF = require("../../../assets/icons/ic_eye_off.png");

export interface IInputTextProps extends TextInputProps {
  title: string;
  error?: string;
  onClear?: () => void;
}

export const InputText: React.FC<IInputTextProps> = ({
  editable = true,
  autoCapitalize,
  placeholderTextColor = COLORS.systemGray,
  secureTextEntry = false,
  keyboardType = "default",
  title,
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

  const passwordIcon = isSecureText ? EYE_ICON : EYE_ICON_OFF;
  const isNeedToShowButtons = value && ref.current?.isFocused();

  const toggleIsSecureText = () => setIsSecureText(!isSecureText);

  return (
    <View>
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
        {isNeedToShowButtons && (
          <View style={styles.buttonsContainer}>
            {secureTextEntry && (
              <IconButton
                style={styles.button}
                source={passwordIcon}
                onPress={toggleIsSecureText}
              />
            )}
            <IconButton
              style={styles.button}
              source={CLEAR_ICON}
              onPress={onClear}
            />
          </View>
        )}
      </View>
      <Typography textStyle={styles.errorLabel}>{error}</Typography>
    </View>
  );
};
