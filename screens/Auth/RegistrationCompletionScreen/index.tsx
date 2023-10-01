import React, { useState } from "react";
import { View } from "react-native";

import { GOOGLE_ICON } from "../../../assets/icons";
import {
  CustomButton,
  IconButton,
  InformativeTextInput,
} from "../../../components/common";
import { LoaderView, Separator } from "../../../components/sections";
import { CustomButtonStyles } from "../../../constants";
import { IconButtonStyles, textStyle_i4 } from "../../../constants/styles";
import { FirebaseErrorMessages } from "../../../enums";
import {
  PASSWORD_RULES,
  extractErrorMessage,
  getConfirmPasswordRules,
} from "../../../helpers";
import { useAppTheme, useAuth, useHookForm } from "../../../hooks";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";
import AlertService from "../../../services/AlertService";
import AuthService from "../../../services/AuthService";
import FirebaseErrorTranslator from "../../../services/ErrorTranslator/FirebaseErrorTranslator";
import { ICreatePasswordForm } from "../../../types/forms";
import styles from "./styles";

export const RegistrationCompletionScreen: React.FC<AuthScreenProps> = ({
  navigation,
  route,
}: AuthScreenProps) => {
  const { getColorStyle } = useAppTheme();
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
      const errorMessage = extractErrorMessage(registerResult);

      AlertService.warning(FirebaseErrorTranslator.translate(errorMessage));

      if (errorMessage === FirebaseErrorMessages.EMAIL_ALREADY_IN_USE) {
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
          style={[
            CustomButtonStyles.base,
            getColorStyle("background", "primary"),
          ]}
          textStyle={textStyle_i4}
          onPress={handleSubmit(createAccountHandler)}
        >
          Create account
        </CustomButton>

        <Separator>or</Separator>

        <IconButton
          style={[IconButtonStyles.outline, getColorStyle("border", "primary")]}
          imageSource={GOOGLE_ICON}
        />
      </View>
    </View>
  );
};
