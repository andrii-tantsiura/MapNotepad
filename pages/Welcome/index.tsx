import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { Typography, Button, Icon } from "../../components/common";
import { globalStyles, outlineButton } from "../../constants/styles";
import { Props } from "../../navigation/AuthStack/types";

const ENTER_PAGE_ICON = require("../../assets/icons/pic_enter_page.png");

const Welcome: React.FC<Props> = ({ navigation }) => {
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
        <Button
          color="lightPrimary"
          style={globalStyles.buttonOutline_i1}
          onPress={registerHandler}
        >
          Create account
        </Button>
      </View>
    </View>
  );
};

export default Welcome;