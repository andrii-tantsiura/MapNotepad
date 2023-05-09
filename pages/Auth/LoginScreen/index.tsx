import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import {
  Button,
  IconButton,
  Separator,
  Loader,
} from "../../../components/common";
import {
  emailValidationSchema,
  passwordValidationSchema,
} from "../../../utils/stringSchemas";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";
import { GlobalStyles } from "../../../constants/styles";
import { loginWithEmail } from "../../../utils/auth";
import AlertService from "../../../services/AlertService";
import { ErrorMessages } from "../../../enums/errorMessages";
import { AuthContext } from "../../../store/AuthContextProvider";
import { NetworkInfoContext } from "../../../store/NetworkInfoContext";
import { FormikValidatedInputText } from "../../../components/sections";

const GOOGLE_ICON = require("../../../assets/icons/ic_google.png");

const RegisterSchema = Yup.object().shape({
  email: emailValidationSchema,
  password: passwordValidationSchema,
});

const LoginScreen: React.FC<AuthScreenProps> = ({ route }) => {
  const isConnected = useContext(NetworkInfoContext);
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState(route.params?.email ?? "");
  const [password, setPassword] = useState("");

  const submitHandler = async (values: any) => {
    setEmail(values.email);
    setPassword(values.password);

    if (isConnected) {
      setIsLoading(true);

      const { idToken, errorMessage } = await loginWithEmail(
        values.email,
        values.password
      );

      setIsLoading(false);

      if (idToken) {
        authContext.authenticate(idToken);
      } else if (errorMessage) {
        AlertService.error(errorMessage);
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
        email: email,
        password: password,
      }}
      onSubmit={submitHandler}
      validationSchema={RegisterSchema}
    >
      {({ values, isValid, handleSubmit, ...formikProps }) => {
        const isLoginDisabled =
          !isValid || values.password.length == 0 || values.email.length == 0;

        return (
          <View style={styles.container}>
            <View style={styles.inputsContainer}>
              <FormikValidatedInputText
                autoCapitalize="none"
                keyboardType="email-address"
                title="Email"
                placeholder="Enter email"
                valueName="email"
                value={values.email}
                {...formikProps}
              />
              <FormikValidatedInputText
                secureTextEntry
                autoCapitalize="none"
                title="Password"
                placeholder="Enter password"
                valueName="password"
                value={values.password}
                {...formikProps}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <Button onPress={handleSubmit} disabled={isLoginDisabled}>
                Login
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

export default LoginScreen;
