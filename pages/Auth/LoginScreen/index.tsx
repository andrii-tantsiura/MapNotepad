import React, { useContext, useState } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import styles from "./styles";
import {
  Button,
  IconButton,
  Separator,
  Loader,
} from "../../../components/common";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";
import { GlobalStyles } from "../../../constants/styles";
import { loginWithEmail } from "../../../utils/auth";
import AlertService from "../../../services/AlertService";
import { ErrorMessages } from "../../../enums/errorMessages";
import { AuthContext } from "../../../store/AuthContextProvider";
import { NetworkInfoContext } from "../../../store/NetworkInfoContext";
import { ValidateInputText } from "../../../components/common/ValidateInputText";
import { EMAIL_RULES, PASSWORD_RULES } from "../../../utils/validationRules";

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
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <ValidateInputText
          control={control}
          resetField={resetField}
          name="email"
          rules={EMAIL_RULES}
          title="Email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <ValidateInputText
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
        <Button onPress={handleSubmit(submitHandler)} disabled={!isValid}>
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
};

export default LoginScreen;
