import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { Typography, Button, Icon } from "../../components/common";
import { outlineButton } from "../../constants/styles";

const ENTER_PAGE_ICON = require("../../assets/icons/pic_enter_page.png");

const StartScreen: React.FC<{ route: any; navigation: any }> = ({
  navigation,
}) => {
  const loginHandler = () => {
    navigation.navigate("Login");
  };

  const registerHandler = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Icon height={150} source={ENTER_PAGE_ICON} />
        <Typography size="i18" weight="bold" color="lightPrimary">
          MapNotepad
        </Typography>
      </View>
      <View style={styles.buttonsContainer}>
        <Button onPress={loginHandler}>Log in</Button>
        <Button {...outlineButton} onPress={registerHandler}>
          Create account
        </Button>
      </View>
    </View>
  );
};

export default StartScreen;
