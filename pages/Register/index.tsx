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
} from "../../utils/validationSchemas";
import { Props } from "../../navigation/AuthStack/types";
import { globalStyles } from "../../constants/styles";

const GOOGLE_ICON = require("../../assets/icons/ic_google.png");

const RegisterSchema = Yup.object().shape({
  name: nameValidationSchema,
  email: emailValidationSchema,
});

const Register: React.FC<Props> = ({ navigation }) => {
  const submitHandler = (values: any) => {
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
      onSubmit={submitHandler}
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
      }) => (
        <View style={styles.container}>
          <View style={styles.inputsContainer}>
            <InputText
              title="Name"
              placeholder="Enter name"
              value={values.name}
              onBlur={() => setFieldTouched("name")}
              onChangeText={handleChange("name")}
              onClear={() => setFieldValue("name", "")}
              error={touched.name ? errors.name : undefined}
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
              error={touched.email ? errors.email : undefined}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              onPress={handleSubmit}
              disabled={
                !isValid || values.name.length == 0 || values.email.length == 0
              }
            >
              Next
            </Button>
            <Separator>or</Separator>
            <IconButton
              style={globalStyles.iconButtonOutline_i1}
              source={GOOGLE_ICON}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Register;
