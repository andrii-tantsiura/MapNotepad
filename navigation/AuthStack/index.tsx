import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import COLORS from "../../constants/colors";
import StartupScreen from "../../pages/Auth/StartupScreen";
import { AuthStackParams } from "./types";
import LoginScreen from "../../pages/Auth/LoginScreen";
import RegistrationStartupScreen from "../../pages/Auth/RegistrationStartupScreen";
import RegistrationCompletionScreen from "../../pages/Auth/RegistrationCompletionScreen";
import { BackButton, HeaderTitle } from "../../components/sections";

const Stack = createStackNavigator<AuthStackParams>();

const AuthStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Startup"
    screenOptions={({ navigation }) => ({
      headerShadowVisible: false,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: COLORS.systemWhite,
      },
      headerTitle: HeaderTitle,
      headerLeft: () => <BackButton onPress={navigation.goBack} />,
    })}
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
