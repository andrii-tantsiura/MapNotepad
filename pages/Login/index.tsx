import React, { useState } from "react";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import {
  Button,
  IconButton,
  Separator,
  InputText,
  Loader,
} from "../../components/common";
import {
  emailValidationSchema,
  passwordValidationSchema,
} from "../../utils/validationSchemas";
import { Props } from "../../navigation/AuthStack/types";
import { globalStyles } from "../../constants/styles";
import { loginWithEmail } from "../../utils/auth";
import { useNetInfo } from "@react-native-community/netinfo";
import { getErrorMessage } from "../../utils/getErrorMessage";
import AlertService from "../../services/AlertService";

const GOOGLE_ICON = require("../../assets/icons/ic_google.png");

const RegisterSchema = Yup.object().shape({
  password: passwordValidationSchema,
  email: emailValidationSchema,
});

const Login: React.FC<Props> = ({ navigation, route }) => {
  const isConnected = useNetInfo();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(route.params?.email ?? "");
  const [password, setPassword] = useState("");

  const submitHandler = async (values: any) => {
    setEmail(values.email);
    setPassword(values.password);

    if (isConnected) {
      setIsLoading(true);

      const { idToken, errorCode } = await loginWithEmail(
        values.email,
        values.password
      );

      setIsLoading(false);

      if (errorCode) {
        AlertService.error(getErrorMessage(errorCode));
      } else {
        // TODO: add token to AuthContext
        // TODO: navigate to home page
        console.log("success", idToken);
      }
    } else {
      AlertService.error("No internet connection");
    }
  };

  if (isLoading) {
    return <Loader message="Loading..." />;
  }

  return (
    <Formik
      // TODO: set the data entered by the user instead of empty values
      initialValues={{
        email: email,
        password: password,
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
        setFieldValue,
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
                onClear={() => setFieldValue("email", "")}
                error={emailErrorText}
              />
              <InputText
                secureTextEntry
                autoCapitalize="none"
                title="Password"
                placeholder="Enter password"
                value={values.password}
                onBlur={() => setFieldTouched("password")}
                onChangeText={handleChange("password")}
                onClear={() => setFieldValue("password", "")}
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
