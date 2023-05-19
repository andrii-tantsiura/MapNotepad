import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import {
  CustomButton,
  IconButton,
  ValidatedInputText,
} from "../../../components/common";
import { LoaderView, Separator } from "../../../components/sections";
import { IconButtonStyles } from "../../../constants/globalStyles";
import { ErrorMessages } from "../../../enums/errorMessages";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";
import AlertService from "../../../services/AlertService";
import { AuthContext } from "../../../store/AuthContextProvider";
import { NetworkInfoContext } from "../../../store/NetworkInfoContext";
import { loginWithEmail } from "../../../utils/auth";
import { EMAIL_RULES, PASSWORD_RULES } from "../../../utils/validationRules";
import styles from "./styles";

const GOOGLE_ICON = require("../../../assets/icons/ic_google.png");

const LoginScreen: React.FC<AuthScreenProps> = ({ route }) => {
  const isConnected = useContext(NetworkInfoContext);
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    resetField,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      email: route.params?.email ?? "",
      password: "",
    },
    mode: "onTouched",
  });

  const submitHandler = async (values: any) => {
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
    return <LoaderView />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <ValidatedInputText
          control={control}
          resetField={resetField}
          name="email"
          rules={EMAIL_RULES}
          title="Email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <ValidatedInputText
          control={control}
          resetField={resetField}
          name="password"
          rules={PASSWORD_RULES}
          title="Password"
          placeholder="Enter password"
          autoCapitalize="none"
          secureTextEntry
        />
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton onPress={handleSubmit(submitHandler)} disabled={!isValid}>
          Login
        </CustomButton>

        <Separator>or</Separator>

        <IconButton style={IconButtonStyles.outline_i1} source={GOOGLE_ICON} />
      </View>
    </View>
  );
};

export default LoginScreen;
