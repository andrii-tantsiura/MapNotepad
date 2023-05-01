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
import { iconSizes } from "../../constants/sizes";
import {
  emailValidationSchema,
  nameValidationSchema,
} from "../../utils/validationSchemas";

const GOOGLE_ICON = require("../../assets/icons/ic_google.png");

const RegisterSchema = Yup.object().shape({
  name: nameValidationSchema,
  email: emailValidationSchema,
});

const Register: React.FC = ({ navigation }: any) => {
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
      }) => (
        <View style={styles.container}>
          <View style={styles.inputsContainer}>
            <InputText
              title="Name"
              placeholder="Enter name"
              value={values.name}
              onBlur={() => setFieldTouched("name")}
              onChangeText={handleChange("name")}
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
              {...iconSizes.i24}
              style={styles.googleButton}
              source={GOOGLE_ICON}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Register;
