import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles";
import {
  Button,
  IconButton,
  Separator,
  InputText,
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
        name: "test",
        email: "test@mail.com",
      }}
      onSubmit={goToNextRegistrationStepHandler}
      validationSchema={RegisterSchema}
    >
      {({
        values,
        errors,
        isValid,
        touched,
        handleChange,
        setFieldTouched,
        handleSubmit,
        setFieldValue,
      }) => {
        const isNextRegistrationStepDisabled =
          !isValid || values.name.length == 0 || values.email.length == 0;

        const nameErrorText = touched.name ? errors.name : undefined;
        const emailErrorText = touched.email ? errors.email : undefined;

        return (
          <View style={styles.container}>
            <View style={styles.inputsContainer}>
              <InputText
                title="Name"
                placeholder="Enter name"
                value={values.name}
                onBlur={() => setFieldTouched("name")}
                onChangeText={handleChange("name")}
                onClear={() => setFieldValue("name", "")}
                error={nameErrorText}
              />
              <InputText
                title="Email"
                autoCapitalize="none"
                placeholder="Enter email"
                keyboardType="email-address"
                value={values.email}
                onBlur={() => setFieldTouched("email")}
                onChangeText={handleChange("email")}
                onClear={() => setFieldValue("email", "")}
                error={emailErrorText}
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
