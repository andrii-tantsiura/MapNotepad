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
  passwordValidationSchema,
} from "../../utils/validationSchemas";
import { Props } from "../../navigation/AuthStack/types";
import { globalStyles } from "../../constants/styles";

const GOOGLE_ICON = require("../../assets/icons/ic_google.png");

const RegisterSchema = Yup.object().shape({
  password: passwordValidationSchema,
  email: emailValidationSchema,
});

const Login: React.FC<Props> = ({ navigation, route }) => {
  const submitHandler = (values: any) => {
    navigation.navigate("RegisterPassword", {
      password: values.password,
      email: values.email,
    });
  };

  return (
    <Formik
      initialValues={{
        password: "",
        email: route.params?.email ?? "",
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
              title="Email"
              autoCapitalize="none"
              placeholder="Enter email"
              keyboardType="email-address"
              value={values.email}
              onBlur={() => setFieldTouched("email")}
              onChangeText={handleChange("email")}
              error={touched.email ? errors.email : undefined}
            />
            <InputText
              title="Password"
              placeholder="Enter password"
              value={values.password}
              onBlur={() => setFieldTouched("password")}
              onChangeText={handleChange("password")}
              error={touched.password ? errors.password : undefined}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              onPress={handleSubmit}
              disabled={
                !isValid ||
                values.password.length == 0 ||
                values.email.length == 0
              }
            >
              Next
            </Button>
            <Separator>or</Separator>
            <IconButton
              {...iconSizes.i24}
              style={globalStyles.buttonOutline_i1}
              source={GOOGLE_ICON}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Login;
