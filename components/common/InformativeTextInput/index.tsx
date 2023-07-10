import { FC } from "react";
import { useFormState } from "react-hook-form";
import { View } from "react-native";

import { textStyle_i11, textStyle_i2, textStyle_i7 } from "../../../constants";
import { Typography } from "../Typography";
import {
  IValidatedInputTextProps,
  ValidatedInputText,
} from "../ValidatedInputText";
import styles from "./styles";

interface IInformativeTextInputProps extends IValidatedInputTextProps {
  title?: string;
}

export const InformativeTextInput: FC<IInformativeTextInputProps> = ({
  formController,
  name,
  title = " ",
  rules,
  style,
  ...restProps
}) => {
  const { errors } = useFormState({ control: formController.control });

  return (
    <>
      <View style={styles.headerContainer}>
        <Typography textAlign="left" style={textStyle_i7}>
          {title}
        </Typography>

        {!rules?.required && (
          <Typography textAlign="left" style={textStyle_i11}>
            Optional
          </Typography>
        )}
      </View>

      <ValidatedInputText
        name={name}
        formController={formController}
        rules={rules}
        style={style}
        {...restProps}
      />

      {errors[name]?.message && (
        <Typography style={textStyle_i2}>
          {String(errors[name]?.message)}
        </Typography>
      )}
    </>
  );
};
