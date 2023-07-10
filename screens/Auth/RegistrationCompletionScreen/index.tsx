import { CommonActions } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import { GOOGLE_ICON } from "../../../assets/icons";
import { CustomButton, ValidatedInputText } from "../../../components/common";
import { LoaderView, Separator } from "../../../components/sections";
import { CustomButtonStyles } from "../../../constants";
import {
  ErrorMessages,
  FirebaseAuthErrorCodes,
  ValidationErrorMessages,
} from "../../../enums";
import { PASSWORD_RULES } from "../../../helpers";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";
import AlertService from "../../../services/AlertService";
import { NetworkInfoContext } from "../../../store/NetworkInfoContext";
import { createUserWithEmail } from "../../../utils";
import styles from "./styles";

export const RegistrationCompletionScreen: React.FC<AuthScreenProps> = ({
  navigation,
  route,
}: AuthScreenProps) => {
  const isConnected = useContext(NetworkInfoContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    resetField,
    watch,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const watchedPassword = watch("password");

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
    return <LoaderView />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <ValidatedInputText
          control={control}
          resetField={resetField}
          name="password"
          rules={PASSWORD_RULES}
          secureTextEntry
          autoCapitalize="none"
          title="Password"
          placeholder="Create password"
        />

        <ValidatedInputText
          control={control}
          resetField={resetField}
          name="confirmPassword"
          rules={{
            required: ValidationErrorMessages.REQUIRED,
            validate: (value) =>
              value === watchedPassword ||
              ValidationErrorMessages.PASSWORD_MISMATCH,
          }}
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
          disabled={!isValid}
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
