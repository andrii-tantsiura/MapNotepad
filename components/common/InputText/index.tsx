import React, { useRef, useState } from "react";
import {
  View,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TextInputFocusEventData,
  TextInput,
  TextInputProps,
} from "react-native";
import styles from "./styles";
import colors from "../../../constants/colors";
import { Typography } from "../Typography";
import { IconButton } from "../IconButton";

const CLEAR_ICON = require("../../../assets/icons/ic_clear.png");
const EYE_ICON = require("../../../assets/icons/ic_eye.png");
const EYE_ICON_OFF = require("../../../assets/icons/ic_eye_off.png");

interface IInputTextProps {
  title: string;
  placeholder?: string;
  value?: string;
  error?: string;
  editable?: boolean;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  onClear?: () => void;
}

export const InputText: React.FC<IInputTextProps> = ({
  title,
  placeholder,
  value,
  error,
  editable = true,
  autoCapitalize,
  secureTextEntry = false,
  keyboardType = "default",
  onChangeText,
  onSubmitEditing,
  onBlur,
  onClear,
}) => {
  const inputRef = useRef<TextInput>(null);
  const [isSecureText, setIsSecureText] = useState(secureTextEntry);

  const toggleIsSecureText = () => setIsSecureText(!isSecureText);

  const passwordIcon = isSecureText ? EYE_ICON : EYE_ICON_OFF;

  return (
    <View>
      <Typography textAlign="left" textStyle={styles.inputTitle}>
        {title}
      </Typography>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          editable={editable}
          secureTextEntry={secureTextEntry && isSecureText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholderTextColor={colors.systemGray}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          onBlur={onBlur}
        />
        {value && inputRef.current?.isFocused() && (
          <View style={styles.buttonsContainer}>
            {secureTextEntry && (
              <IconButton
                source={passwordIcon}
                style={styles.clear}
                onPress={toggleIsSecureText}
              />
            )}
            <IconButton
              source={CLEAR_ICON}
              style={styles.clear}
              onPress={onClear}
            />
          </View>
        )}
      </View>
      <Typography textStyle={styles.inputError}>{error}</Typography>
    </View>
  );
};
