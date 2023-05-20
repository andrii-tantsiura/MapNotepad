import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";

import { LEFT_BLUE_ICON } from "../../assets/icons";
import COLORS from "../../constants/colors";
import { ImageStyles, TextStyles } from "../../constants/globalStyles";
import LoginScreen from "../../screens/Auth/LoginScreen";
import RegistrationCompletionScreen from "../../screens/Auth/RegistrationCompletionScreen";
import RegistrationStartupScreen from "../../screens/Auth/RegistrationStartupScreen";
import StartupScreen from "../../screens/Auth/StartupScreen";
import { AuthStackParamList } from "./types";

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
      headerTitleStyle: TextStyles.header_i1,
      headerBackImage: () => (
        <Image style={ImageStyles.image_i1} source={LEFT_BLUE_ICON} />
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
