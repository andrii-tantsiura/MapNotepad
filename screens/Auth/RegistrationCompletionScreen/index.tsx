import React, { useState } from "react";
import { View } from "react-native";

import { GOOGLE_ICON } from "../../../assets/icons";
import { CustomButton, InformativeTextInput } from "../../../components/common";
import { LoaderView, Separator } from "../../../components/sections";
import { CustomButtonStyles } from "../../../constants";
import { FirebaseErrorCodes } from "../../../enums";
import { PASSWORD_RULES, getConfirmPasswordRules } from "../../../helpers";
import { useAuth, useHookForm } from "../../../hooks";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";
import AlertService from "../../../services/AlertService";
import AuthService from "../../../services/AuthService";
import { ICreatePasswordForm } from "../../../types/forms";
import styles from "./styles";

export const RegistrationCompletionScreen: React.FC<AuthScreenProps> = ({
  navigation,
  route,
}: AuthScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setCredentials } = useAuth();

  const { formController, watch, handleSubmit } =
    useHookForm<ICreatePasswordForm>();

  const createAccountHandler = async ({ password }: ICreatePasswordForm) => {
    setIsLoading(true);

    const registerResult = await AuthService.registerWithEmail(
      route.params?.email ?? "",
      password
    );

    setIsLoading(false);

    if (registerResult.isSuccess && registerResult.data) {
      setCredentials(registerResult.data);
    } else {
      const message = registerResult.getMessage();

      AlertService.error(message);

      if (message === FirebaseErrorCodes.EMAIL_ALREADY_IN_USE) {
        navigation.goBack();
      }
    }
  };

  if (isLoading) {
    return <LoaderView />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <InformativeTextInput
          formController={formController}
          rules={PASSWORD_RULES}
          name="password"
          secureTextEntry
          autoCapitalize="none"
          title="Password"
          placeholder="Create password"
        />

        <InformativeTextInput
          formController={formController}
          rules={getConfirmPasswordRules(watch("password"))}
          name="confirmPassword"
          secureTextEntry
          autoCapitalize="none"
          title="Confirm password"
          placeholder="Repeat password"
        />
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton
          style={CustomButtonStyles.rectSolid_i1}
          onPress={handleSubmit(createAccountHandler)}
        >
          Create account
        </CustomButton>

        <Separator>or</Separator>

        <CustomButton
          style={CustomButtonStyles.rectOutline_i2}
          imageSource={GOOGLE_ICON}
        />
      </View>
    </View>
  );
};
