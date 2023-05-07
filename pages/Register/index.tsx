import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import {
  Button,
  IconButton,
  Separator,
  ValidatedInputText,
} from "../../components/common";
import {
  emailValidationSchema,
  nameValidationSchema,
} from "../../utils/stringSchemas";
import { Props } from "../../navigation/AuthStack/types";
import { GlobalStyles } from "../../constants/styles";

const GOOGLE_ICON = require("../../assets/icons/ic_google.png");

const RegisterSchema = Yup.object().shape({
  name: nameValidationSchema,
  email: emailValidationSchema,
});

const Register: React.FC<Props> = ({ navigation }) => {
  const goToNextRegistrationStepHandler = (values: any) => {
    navigation.navigate("RegisterPassword", {
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
      validationSchema={RegisterSchema}
    >
      {({ values, isValid, handleSubmit, ...formikProps }) => {
        const isNextRegistrationStepDisabled =
          !isValid || values.name.length == 0 || values.email.length == 0;

        return (
          <View style={styles.container}>
            <View style={styles.inputsContainer}>
              <ValidatedInputText
                title="Name"
                placeholder="Enter name"
                valueName="name"
                value={values.name}
                {...formikProps}
              />
              <ValidatedInputText
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

export default Register;
