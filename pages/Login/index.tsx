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
import {
  emailValidationSchema,
  passwordValidationSchema,
} from "../../utils/validationSchemas";
import { Props } from "../../navigation/AuthStack/types";
import { globalStyles } from "../../constants/styles";

const GOOGLE_ICON = require("../../assets/icons/ic_google.png");

const RegisterSchema = Yup.object().shape({
  password: passwordValidationSchema,
  email: emailValidationSchema,
});

const Login: React.FC<Props> = ({ navigation, route }) => {
  const submitHandler = (values: any) => {
    // TODO: make authorization
  };

  return (
    <Formik
      initialValues={{
        password: "",
        email: route.params?.email ?? "",
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
      }) => {
        const emailErrorText = touched.email ? errors.email : undefined;

        const passwordErrorText = touched.password
          ? errors.password
          : undefined;

        const isLoginDisabled =
          !isValid || values.password.length == 0 || values.email.length == 0;

        return (
          <View style={styles.container}>
            <View style={styles.inputsContainer}>
              <InputText
                title="Email"
                autoCapitalize="none"
                placeholder="Enter email"
                keyboardType="email-address"
                value={values.email}
                onBlur={() => setFieldTouched("email")}
                onChangeText={handleChange("email")}
                error={emailErrorText}
              />
              <InputText
                title="Password"
                placeholder="Enter password"
                value={values.password}
                onBlur={() => setFieldTouched("password")}
                onChangeText={handleChange("password")}
                error={passwordErrorText}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <Button onPress={handleSubmit} disabled={isLoginDisabled}>
                Login
              </Button>
              <Separator>or</Separator>
              <IconButton
                style={globalStyles.iconButtonOutline_i1}
                source={GOOGLE_ICON}
              />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default Login;
