import { FormikHandlers, FormikHelpers, FormikTouched } from "formik";
import { IInputTextProps, InputText } from "..";

interface IValidateInputText extends IInputTextProps {
  valueName: string;
  errors?: any;
  touched?: any;
  setFieldValue: FormikHelpers<string>["setFieldValue"];
  setFieldTouched: FormikHelpers<string>["setFieldTouched"];
  handleChange: FormikHandlers["handleChange"];
}

export const ValidatedInputText: React.FC<IValidateInputText> = ({
  valueName,
  value,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
  handleChange,
  ...props
}) => {
  const clearValue = () => setFieldValue(valueName, "");
  const errorText = touched?.[valueName] ? errors?.[valueName] : undefined;

  return (
    <InputText
      {...props}
      value={value}
      error={errorText}
      onBlur={() => setFieldTouched(valueName)}
      onChangeText={handleChange(valueName)}
      onClear={clearValue}
    />
  );
};
