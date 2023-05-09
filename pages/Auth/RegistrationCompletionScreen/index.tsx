import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { CommonActions } from "@react-navigation/native";

import styles from "./styles";
import {
  Button,
  IconButton,
  Separator,
  Loader,
} from "../../../components/common";
import {
  passwordValidationSchema,
  confirmPasswordValidationSchema,
} from "../../../utils/stringSchemas";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";
import { GlobalStyles } from "../../../constants/styles";
import AlertService from "../../../services/AlertService";
import { createUserWithEmail } from "../../../utils/auth";
import { FirebaseAuthErrorCodes } from "../../../enums/fireabaseAuthErrorCodes";
import { ErrorMessages } from "../../../enums/errorMessages";
import { NetworkInfoContext } from "../../../store/NetworkInfoContext";
import { FormikValidatedInputText } from "../../../components/sections";

const GOOGLE_ICON = require("../../../assets/icons/ic_google.png");

const PasswordSchema = Yup.object().shape({
  password: passwordValidationSchema,
  confirmPassword: confirmPasswordValidationSchema,
});

const RegistrationCompletionScreen: React.FC<AuthScreenProps> = ({
  navigation,
  route,
}: AuthScreenProps) => {
  const isConnected = useContext(NetworkInfoContext);
  const [isLoading, setIsLoading] = useState(false);

  const createAccountHandler = async (values: any) => {
    if (isConnected) {
      setIsLoading(true);

      const { errorCode, errorMessage } = await createUserWithEmail(
        route.params?.email ?? "",
        values.password
      );

      setIsLoading(false);

      if (errorMessage) {
        if (errorCode === FirebaseAuthErrorCodes.EMAIL_EXISTS) {
          navigation.goBack();
        }

        AlertService.error(errorMessage);
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: "Startup" },
              {
                name: "Login",
                params: { email: route.params?.email },
              },
            ],
          })
        );
      }
    } else {
      AlertService.error(ErrorMessages.NO_INTERNET_CONNECTION);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      onSubmit={createAccountHandler}
      validationSchema={PasswordSchema}
    >
      {({ values, isValid, handleSubmit, ...formikProps }) => {
        const isAccountCreationDisabled =
          !isValid ||
          values.password.length == 0 ||
          values.confirmPassword.length == 0;

        return (
          <View style={styles.container}>
            <View style={styles.inputsContainer}>
              <FormikValidatedInputText
                secureTextEntry
                autoCapitalize="none"
                title="Password"
                placeholder="Create password"
                valueName="password"
                value={values.password}
                {...formikProps}
              />
              <FormikValidatedInputText
                secureTextEntry
                autoCapitalize="none"
                title="Confirm password"
                placeholder="Repeat password"
                valueName="confirmPassword"
                value={values.confirmPassword}
                {...formikProps}
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
                style={GlobalStyles.iconButtonOutline_i1}
                source={GOOGLE_ICON}
              />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default RegistrationCompletionScreen;
