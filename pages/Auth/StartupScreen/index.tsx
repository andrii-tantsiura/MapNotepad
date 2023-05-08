import React from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import { GlobalStyles } from "../../../constants/styles";
import { Typography, Button } from "../../../components/common";
import { ScreenProps } from "../../../navigation/AuthStack/types";

const ENTER_PAGE_ICON = require("../../assets/icons/pic_enter_page.png");

const StartupScreen: React.FC<ScreenProps> = ({ navigation }) => {
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
        <Button onPress={loginHandler}>Log in</Button>
        <Button
          color="lightPrimary"
          style={GlobalStyles.buttonOutline_i1}
          onPress={createAccountHandler}
        >
          Create account
        </Button>
      </View>
    </View>
  );
};

export default StartupScreen;
