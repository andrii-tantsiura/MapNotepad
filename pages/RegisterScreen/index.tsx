import React from "react";
import { View } from "react-native";
import { Button, IconButton, Separator } from "../../components/common";
import styles from "./styles";
import { iconSizes } from "../../constants/sizes";
import { InputText } from "../../components/common/InputText";

import GOOGLE_ICON from "../../assets/icons/ic_google.png";

const RegisterScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <InputText title="Name" placeholder="Enter your name" />
        <InputText title="Email" placeholder="Enter email" />
      </View>
      <View style={styles.buttonsContainer}>
        <Button>Log in</Button>
        <Separator>or</Separator>
        <IconButton
          {...iconSizes.i24}
          source={GOOGLE_ICON}
          style={styles.googleButton}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
