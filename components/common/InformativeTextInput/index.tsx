import { FC } from "react";
import { useFormState } from "react-hook-form";
import { View } from "react-native";

import { textStyle_i2, textStyle_i7 } from "../../../constants";
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
    <View style={style}>
      <View style={styles.headerContainer}>
        <Typography textAlign="left" style={textStyle_i7}>
          {title}
        </Typography>

        {!rules?.required && (
          <Typography textAlign="left" style={textStyle_i7}>
            (optional)
          </Typography>
        )}
      </View>

      <ValidatedInputText
        name={name}
        formController={formController}
        rules={rules}
        {...restProps}
      />

      <Typography style={[textStyle_i2, styles.errorText]}>
        {errors[name]?.message && String(errors[name]?.message)}
      </Typography>
    </View>
  );
};
