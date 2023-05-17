import React from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import styles from "./styles";
import {
  CustomButton,
  IconButton,
  Separator,
  ValidatedInputText,
} from "../../../components/common";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";
import { GlobalStyles } from "../../../constants/styles";
import { EMAIL_RULES, USERNAME_RULES } from "../../../utils/validationRules";

const GOOGLE_ICON = require("../../../assets/icons/ic_google.png");

const RegistrationStartupScreen: React.FC<AuthScreenProps> = ({
  navigation,
}) => {
  const goToNextRegistrationStepHandler = (values: any) => {
    navigation.navigate("RegistrationCompletion", {
      name: values.name,
      email: values.email,
    });
  };

  const {
    control,
    handleSubmit,
    resetField,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <ValidatedInputText
          control={control}
          resetField={resetField}
          name="name"
          rules={USERNAME_RULES}
          title="Name"
          placeholder="Enter name"
        />
        <ValidatedInputText
          control={control}
          resetField={resetField}
          name="email"
          rules={EMAIL_RULES}
          autoCapitalize="none"
          keyboardType="email-address"
          title="Email"
          placeholder="Enter email"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <CustomButton
          disabled={!isValid}
          onPress={handleSubmit(goToNextRegistrationStepHandler)}
        >
          Next
        </CustomButton>
        <Separator>or</Separator>
        <IconButton
          style={GlobalStyles.iconButtonOutline_i1}
          source={GOOGLE_ICON}
        />
      </View>
    </View>
  );
};

export default RegistrationStartupScreen;
