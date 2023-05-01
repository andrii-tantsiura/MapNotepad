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
import styles from "./styles";
import colors from "../../../constants/colors";
import { Typography } from "../Typography";

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
