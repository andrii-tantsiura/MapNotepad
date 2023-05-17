import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import COLORS from "../../constants/colors";
import { GlobalStyles } from "../../constants/styles";
import { AuthStackParamList } from "./types";
import StartupScreen from "../../pages/Auth/StartupScreen";
import LoginScreen from "../../pages/Auth/LoginScreen";
import RegistrationStartupScreen from "../../pages/Auth/RegistrationStartupScreen";
import RegistrationCompletionScreen from "../../pages/Auth/RegistrationCompletionScreen";

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
      headerTitleStyle: GlobalStyles.headerTitle_i1,
      headerBackImage: () => (
        <Image style={GlobalStyles.image_i1} source={LEFT_ICON} />
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
