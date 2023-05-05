import React, { useState } from "react";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { CommonActions } from "@react-navigation/native";

import styles from "./styles";
import {
  Button,
  IconButton,
  Separator,
  InputText,
  Loader,
} from "../../components/common";
import {
  passwordValidationSchema,
  confirmPasswordValidationSchema,
} from "../../utils/validationSchemas";
import { Props } from "../../navigation/AuthStack/types";
import { globalStyles } from "../../constants/styles";
import { useNetInfo } from "@react-native-community/netinfo";
import AlertService from "../../services/AlertService";
import { createUserWithEmail } from "../../utils/auth";
import { getErrorMessage } from "../../utils/getErrorMessage";

const GOOGLE_ICON = require("../../assets/icons/ic_google.png");

const RegisterSchema = Yup.object().shape({
  password: passwordValidationSchema,
  confirmPassword: confirmPasswordValidationSchema,
});

const RegisterPassword: React.FC<Props> = ({ navigation, route }: Props) => {
  const isConnected = useNetInfo();
  const [isLoading, setIsLoading] = useState(false);

  const createAccountHandler = async (values: any) => {
    if (isConnected) {
      setIsLoading(true);

      const { idToken, errorCode } = await createUserWithEmail(
        route.params?.email ?? "",
        values.password
      );

      setIsLoading(false);

      if (errorCode) {
        AlertService.error(getErrorMessage(errorCode));
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: "Welcome" },
              {
                name: "Login",
                params: { email: route.params?.email },
              },
            ],
          })
        );
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
        password: "",
        confirmPassword: "",
      }}
      onSubmit={createAccountHandler}
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
        setFieldValue,
      }) => {
        const isAccountCreationDisabled =
          !isValid ||
          values.password.length == 0 ||
          values.confirmPassword.length == 0;

        const passwordErrorText = touched.password
          ? errors.password
          : undefined;

        const confirmPasswordErrorText = touched.confirmPassword
          ? errors.confirmPassword
          : undefined;

        return (
          <View style={styles.container}>
            <View style={styles.inputsContainer}>
              <InputText
                secureTextEntry
                autoCapitalize="none"
                title="Password"
                placeholder="Create password"
                value={values.password}
                onBlur={() => setFieldTouched("password")}
                onChangeText={handleChange("password")}
                error={passwordErrorText}
                onClear={() => setFieldValue("password", "")}
              />
              <InputText
                secureTextEntry
                autoCapitalize="none"
                title="Confirm password"
                placeholder="Repeat password"
                value={values.confirmPassword}
                onBlur={() => setFieldTouched("confirmPassword")}
                onChangeText={handleChange("confirmPassword")}
                onClear={() => setFieldValue("confirmPassword", "")}
                error={confirmPasswordErrorText}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                onPress={handleSubmit}
                disabled={isAccountCreationDisabled}
              >
                Create account
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

export default RegisterPassword;
