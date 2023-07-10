import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import { GOOGLE_ICON } from "../../../assets/icons";
import { CustomButton, ValidatedInputText } from "../../../components/common";
import { Separator } from "../../../components/sections";
import { CustomButtonStyles, IconButtonStyles } from "../../../constants";
import { EMAIL_RULES, USERNAME_RULES } from "../../../helpers";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";
import styles from "./styles";

export const RegistrationStartupScreen: React.FC<AuthScreenProps> = ({
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
          style={CustomButtonStyles.simple_i1}
          onPress={handleSubmit(goToNextRegistrationStepHandler)}
        >
          Next
        </CustomButton>

        <Separator>or</Separator>

        <CustomButton
          containerStyle={IconButtonStyles.outline_i1}
          imageSource={GOOGLE_ICON}
        />
      </View>
    </View>
  );
};
