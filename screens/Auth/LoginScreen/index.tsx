import React, { useState } from "react";
import { View } from "react-native";

import { GOOGLE_ICON } from "../../../assets/icons";
import {
  CustomButton,
  IconButton,
  InformativeTextInput,
} from "../../../components/common";
import { LoaderView, Separator } from "../../../components/sections";
import { IconButtonStyles, textStyle_i4 } from "../../../constants/styles";
import {
  EMAIL_RULES,
  PASSWORD_RULES,
  extractErrorMessage,
} from "../../../helpers";
import { useAuth, useHookForm } from "../../../hooks";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";
import AlertService from "../../../services/AlertService";
import AuthService from "../../../services/AuthService";
import FirebaseErrorTranslator from "../../../services/ErrorTranslator/FirebaseErrorTranslator";
import { ILoginForm } from "../../../types/forms";
import styles from "./styles";

export const LoginScreen: React.FC<AuthScreenProps> = ({ route }) => {

  const { setCredentials } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const { formController, handleSubmit } = useHookForm<ILoginForm>({
    defaultValues: {
      email: route.params?.email ?? "test@mail.com",
      password: "Test123@",
    },
  });

  const submitHandler = async ({ email, password }: ILoginForm) => {
    setIsLoading(true);

    const loginResult = await AuthService.loginWithEmail(email, password);

    if (loginResult.isSuccess && loginResult.data) {
      setCredentials(loginResult.data);
    } else {
      const error = extractErrorMessage(loginResult);

      AlertService.error(FirebaseErrorTranslator.translate(error));
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <LoaderView />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <InformativeTextInput
          formController={formController}
          rules={EMAIL_RULES}
          name="email"
          title="Email"
          autoCapitalize="none"
          placeholder="Enter email"
          keyboardType="email-address"
        />

        <InformativeTextInput
          formController={formController}
          rules={PASSWORD_RULES}
          name="password"
          title="Password"
          placeholder="Enter password"
          autoCapitalize="none"
          secureTextEntry
        />
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton
          backgroundColor="primary"
          textStyle={textStyle_i4}
          onPress={handleSubmit(submitHandler)}
        >
          Login
        </CustomButton>

        <Separator>or</Separator>

        <IconButton
          style={IconButtonStyles.outline}
          borderColor="primary"
          imageSource={GOOGLE_ICON}
        />
      </View>
    </View>
  );
};
