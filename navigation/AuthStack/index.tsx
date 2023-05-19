import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";

import COLORS from "../../constants/colors";
import { ComponentStyles } from "../../constants/styles";
import LoginScreen from "../../pages/Auth/LoginScreen";
import RegistrationCompletionScreen from "../../pages/Auth/RegistrationCompletionScreen";
import RegistrationStartupScreen from "../../pages/Auth/RegistrationStartupScreen";
import StartupScreen from "../../pages/Auth/StartupScreen";
import { AuthStackParamList } from "./types";

const LEFT_ICON = require("../../assets/icons/ic_left_blue.png");

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Startup"
    screenOptions={{
      headerShadowVisible: false,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: COLORS.systemWhite,
      },
      headerTitleStyle: ComponentStyles.headerTitle_i1,
      headerBackImage: () => (
        <Image style={ComponentStyles.image_i1} source={LEFT_ICON} />
      ),
    }}
  >
    <Stack.Screen
      name="Startup"
      component={StartupScreen}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="RegistrationStartup"
      component={RegistrationStartupScreen}
      options={{
        title: "Create an account",
      }}
    />

    <Stack.Screen
      name="RegistrationCompletion"
      component={RegistrationCompletionScreen}
      options={{
        title: "Create an account",
      }}
    />

    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        title: "Log in",
      }}
    />
  </Stack.Navigator>
);

export default AuthStack;
