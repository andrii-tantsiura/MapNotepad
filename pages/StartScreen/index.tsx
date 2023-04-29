import * as React from "react";
import { Image, View } from "react-native";
import styles from "./styles";
import { Typography, Button } from "../../components/common";
import { Icon } from "../../components/common/Icon";

const StartScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Icon
          height={150}
          source={require("../../assets/icons/pic_enter_page.png")}
        />
        <Typography size="i18" weight="bold" color="lightPrimary">
          MapNotepad
        </Typography>
      </View>
      <View style={styles.buttonsContainer}>
        <Button>Log in</Button>
        <Button color="lightPrimary" style={styles.loginButton}>
          Create account
        </Button>
      </View>
    </View>
  );
};

export default StartScreen;
