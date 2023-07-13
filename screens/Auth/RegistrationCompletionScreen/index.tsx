import { CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import { GOOGLE_ICON } from "../../../assets/icons";
import {
  CustomButton,
  IFormController,
  InformativeTextInput,
} from "../../../components/common";
import { LoaderView, Separator } from "../../../components/sections";
import { CustomButtonStyles } from "../../../constants";
import { PASSWORD_RULES, getConfirmPasswordRules } from "../../../helpers";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";
import AlertService from "../../../services/AlertService";
import AuthService from "../../../services/AuthService";
import { CreatePasswordForm } from "../../../types";
import styles from "./styles";

export const RegistrationCompletionScreen: React.FC<AuthScreenProps> = ({
  navigation,
  route,
}: AuthScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { control, resetField, trigger, watch, handleSubmit } =
    useForm<CreatePasswordForm>();

  const formController: IFormController = {
    control,
    resetField,
    trigger,
  };

  const createAccountHandler = async ({ password }: CreatePasswordForm) => {
    setIsLoading(true);

    const registerResult = await AuthService.registerWithEmail(
      route.params?.email ?? "",
      password
    );

    setIsLoading(false);

    if (registerResult.isSuccess && registerResult.result) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: "Startup",
            },
            {
              name: "Login",
              params: {
                email: route.params?.email,
              },
            },
          ],
        })
      );
    } else {
      AlertService.error(registerResult.toString());
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
