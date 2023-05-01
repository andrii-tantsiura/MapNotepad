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

const GOOGLE_ICON = require("../../assets/icons/ic_google.png");

const RegisterSchema = Yup.object().shape({
  password: passwordValidationSchema,
  confirmPassword: confirmPasswordValidationSchema,
});

const RegisterPasswordScreen: React.FC = ({ navigation }: any) => {
  const submitHandler = (values: any) => {
    // navigation.navigate("Login");
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
              style={styles.googleButton}
              source={GOOGLE_ICON}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default RegisterPasswordScreen;