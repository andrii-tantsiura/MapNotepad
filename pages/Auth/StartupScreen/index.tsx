import React from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import { GlobalStyles } from "../../../constants/styles";
import { Typography, CustomButton } from "../../../components/common";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";

const ENTER_PAGE_ICON = require("../../../assets/icons/pic_enter_page.png");

const StartupScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
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
          source={ENTER_PAGE_ICON}
        />

        <Typography size="i18" weight="bold" color="lightPrimary">
          MapNotepad
        </Typography>
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton onPress={loginHandler}>Log in</CustomButton>

        <CustomButton
          color="lightPrimary"
          style={GlobalStyles.buttonOutline_i1}
          onPress={createAccountHandler}
        >
          Create account
        </CustomButton>
      </View>
    </View>
  );
};

export default StartupScreen;
