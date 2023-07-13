import React, { useContext, useState } from "react";
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
import { EMAIL_RULES, PASSWORD_RULES } from "../../../helpers";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";
import AlertService from "../../../services/AlertService";
import AuthService from "../../../services/AuthService";
import { AuthContext } from "../../../store/AuthContextProvider";
import { LoginForm } from "../../../types/forms";
import styles from "./styles";

export const LoginScreen: React.FC<AuthScreenProps> = ({ route }) => {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const { control, trigger, resetField, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      email: route.params?.email,
    },
  });

  const formController: IFormController = {
    control,
    resetField,
    trigger,
  };

  const submitHandler = async ({ email, password }: LoginForm) => {
    setIsLoading(true);

    const loginResult = await AuthService.loginWithEmail(email, password);

    if (loginResult.isSuccess && loginResult.result) {
      authContext.authenticate(loginResult.result.idToken);
    } else {
      AlertService.error(loginResult.getErrorDescription());
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
          style={CustomButtonStyles.rectSolid_i1}
          onPress={handleSubmit(submitHandler)}
        >
          Login
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
