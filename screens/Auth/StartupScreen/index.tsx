import React from "react";
import { Image, View } from "react-native";

import { ENTER_PAGE_PIC } from "../../../assets/icons";
import { CustomButton, Typography } from "../../../components/common";
import { textStyle_i1 } from "../../../constants";
import { CustomButtonStyles } from "../../../constants/globalStyles";
import { AuthScreenProps } from "../../../navigation/AuthStack/types";
import styles from "./styles";

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
          source={ENTER_PAGE_PIC}
        />

        <Typography style={textStyle_i1}>Map Notepad</Typography>
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton
          style={CustomButtonStyles.simple_i1}
          onPress={loginHandler}
        >
          Log in
        </CustomButton>

        <CustomButton
          style={CustomButtonStyles.outline_i1}
          onPress={createAccountHandler}
        >
          Create account
        </CustomButton>
      </View>
    </View>
  );
};

export default StartupScreen;
