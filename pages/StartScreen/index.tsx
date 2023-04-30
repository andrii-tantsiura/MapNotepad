import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { Typography, Button } from "../../components/common";
import { Icon } from "../../components/common/Icon";
import { outlineButton } from "../../constants/styles";

import ENTER_PAGE_ICON from "../../assets/icons/pic_enter_page.png";

const StartScreen: React.FC<{ route; navigation }> = ({ navigation }) => {
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
