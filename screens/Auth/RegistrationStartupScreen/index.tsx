import React from "react";
import { View } from "react-native";

import { GOOGLE_ICON } from "../../../assets/icons";
import {
  CustomButton,
  IconButton,
  InformativeTextInput,
} from "../../../components/common";
import { Separator } from "../../../components/sections";
import { CustomButtonStyles } from "../../../constants";
import { IconButtonStyles, textStyle_i4 } from "../../../constants/styles";
import { EMAIL_RULES, USERNAME_RULES } from "../../../helpers";
import { useAppTheme, useHookForm } from "../../../hooks";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";
import { ICreateUserForm } from "../../../types/forms";
import styles from "./styles";

export const RegistrationStartupScreen: React.FC<AuthScreenProps> = ({
  navigation,
}) => {
  const { appColors, getColorStyle } = useAppTheme();

  const goToNextRegistrationStepHandler = ({
    name,
    email,
  }: ICreateUserForm) => {
    navigation.navigate("RegistrationCompletion", {
      name,
      email,
    });
  };

  const { formController, handleSubmit } = useHookForm<ICreateUserForm>({
    defaultValues: {
      name: "name",
      email: "test123@mail.com",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <InformativeTextInput
          formController={formController}
          name="name"
          rules={USERNAME_RULES}
          title="Name"
          placeholder="Enter name"
        />

        <InformativeTextInput
          formController={formController}
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
          style={[
            CustomButtonStyles.base,
            getColorStyle("background", "primary"),
          ]}
          textStyle={textStyle_i4}
          onPress={handleSubmit(goToNextRegistrationStepHandler)}
        >
          Next
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
