import React from "react";
import {
  View,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TextInputFocusEventData,
  TextInput,
  TextInputProps,
} from "react-native";
import { Typography } from "../Typography";
import styles from "./styles";
import colors from "../../../constants/colors";

interface IInputTextProps {
  title: string;
  placeholder?: string;
  value?: string;
  error?: string;
  editable?: boolean;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  keyboardType?: KeyboardTypeOptions;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
}

export const InputText: React.FC<IInputTextProps> = ({
  title,
  value,
  placeholder,
  error,
  keyboardType = "default",
  autoCapitalize,
  editable = true,
  secureTextEntry = false,
  onChangeText,
  onSubmitEditing,
  onBlur,
}) => (
  <View>
    <Typography textAlign="left" textStyle={styles.inputTitle}>
      {title}
    </Typography>
    <TextInput
      style={styles.input}
      editable={editable}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      placeholderTextColor={colors.systemGray}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onBlur={onBlur}
    />
    <Typography textStyle={styles.inputError}>{error}</Typography>
  </View>
);
