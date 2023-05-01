import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import {
  Button,
  IconButton,
  Separator,
  InputText,
} from "../../components/common";
import { iconSizes } from "../../constants/sizes";
import {
  passwordValidationSchema,
  confirmPasswordValidationSchema,
} from "../../utils/validationSchemas";
import { Props } from "../../navigation/AuthStack/types";
import { globalStyles } from "../../constants/styles";

const GOOGLE_ICON = require("../../assets/icons/ic_google.png");

const RegisterSchema = Yup.object().shape({
  password: passwordValidationSchema,
  confirmPassword: confirmPasswordValidationSchema,
});

const RegisterPassword: React.FC<Props> = ({ navigation, route }: Props) => {
  const submitHandler = (values: any) => {
    navigation.navigate("Login", { email: route.params?.email });
  };

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      onSubmit={submitHandler}
      validationSchema={RegisterSchema}
    >
      {({
        values,
        errors,
        isValid,
        touched,
        handleChange,
        setFieldTouched,
        handleSubmit,
      }) => (
        <View style={styles.container}>
          <View style={styles.inputsContainer}>
            <InputText
              keyboardType="numeric"
              title="Password"
              placeholder="Create password"
              value={values.password}
              onBlur={() => setFieldTouched("password")}
              onChangeText={handleChange("password")}
              error={touched.password ? errors.password : undefined}
            />
            <InputText
              autoCapitalize="none"
              keyboardType="numeric"
              title="Confirm password"
              placeholder="Repeat password"
              value={values.confirmPassword}
              onBlur={() => setFieldTouched("confirmPassword")}
              onChangeText={handleChange("confirmPassword")}
              error={
                touched.confirmPassword ? errors.confirmPassword : undefined
              }
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              onPress={handleSubmit}
              disabled={
                !isValid ||
                values.password.length == 0 ||
                values.confirmPassword.length == 0
              }
            >
              Create account
            </Button>
            <Separator>or</Separator>
            <IconButton
              {...iconSizes.i24}
              style={globalStyles.buttonOutline_i1}
              source={GOOGLE_ICON}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default RegisterPassword;
