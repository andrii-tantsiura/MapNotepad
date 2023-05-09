import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import { Button, IconButton, Separator } from "../../../components/common";
import {
  nameValidationSchema,
  emailValidationSchema,
} from "../../../utils/stringSchemas";
import { ScreenProps } from "../../../navigation/AuthStack/types";
import { GlobalStyles } from "../../../constants/styles";
import { FormikValidatedInputText } from "../../../components/sections";

const GOOGLE_ICON = require("../../../assets/icons/ic_google.png");

const UserSchema = Yup.object().shape({
  name: nameValidationSchema,
  email: emailValidationSchema,
});

const RegistrationStartupScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const goToNextRegistrationStepHandler = (values: any) => {
    navigation.navigate("RegistrationCompletion", {
      name: values.name,
      email: values.email,
    });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
      }}
      onSubmit={goToNextRegistrationStepHandler}
      validationSchema={UserSchema}
    >
      {({ values, isValid, handleSubmit, ...formikProps }) => {
        const isNextRegistrationStepDisabled =
          !isValid || values.name.length == 0 || values.email.length == 0;

        return (
          <View style={styles.container}>
            <View style={styles.inputsContainer}>
              <FormikValidatedInputText
                title="Name"
                placeholder="Enter name"
                valueName="name"
                value={values.name}
                {...formikProps}
              />
              <FormikValidatedInputText
                autoCapitalize="none"
                keyboardType="email-address"
                title="Email"
                placeholder="Enter email"
                valueName="email"
                value={values.email}
                {...formikProps}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                onPress={handleSubmit}
                disabled={isNextRegistrationStepDisabled}
              >
                Next
              </Button>
              <Separator>or</Separator>
              <IconButton
                style={GlobalStyles.iconButtonOutline_i1}
                source={GOOGLE_ICON}
              />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default RegistrationStartupScreen;