import React from "react";
import { Image, View } from "react-native";

import { ENTER_PAGE_PIC } from "../../../assets/icons";
import { CustomButton, Typography } from "../../../components/common";
import {
  CustomButtonStyles,
  textStyle_i1,
  textStyle_i4,
  textStyle_i5,
} from "../../../constants";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";
import styles from "./styles";

export const StartupScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const loginHandler = () => {
    navigation.navigate("Login");
  };

  const createAccountHandler = () => {
    navigation.navigate("RegistrationStartup");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={ENTER_PAGE_PIC}
        />

        <Typography style={textStyle_i1}>Map Notepad</Typography>
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton
          style={CustomButtonStyles.base}
          backgroundColor="primary"
          textStyle={textStyle_i4}
          onPress={loginHandler}
        >
          Log in
        </CustomButton>

        <CustomButton
          style={CustomButtonStyles.base}
          backgroundColor="background"
          borderColor="primary"
          textStyle={textStyle_i5}
          onPress={createAccountHandler}
        >
          Create account
        </CustomButton>
      </View>
    </View>
  );
};
