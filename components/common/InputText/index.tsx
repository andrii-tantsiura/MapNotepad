import React from "react";
import {
  View,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
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
  keyboardType?: KeyboardTypeOptions;
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
  keyboardType = "numeric",
  editable = true,
  secureTextEntry = false,
  onChangeText,
  onSubmitEditing,
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
      placeholderTextColor={colors.systemGray}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    ></TextInput>
    <Typography textStyle={styles.inputError}>{error}</Typography>
  </View>
);
