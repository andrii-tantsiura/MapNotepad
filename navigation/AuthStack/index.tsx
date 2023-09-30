import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { HeaderBackImage, HeaderTitle } from "../../components/sections";
import { useAppTheme } from "../../hooks";
import {
  LoginScreen,
  RegistrationCompletionScreen,
  RegistrationStartupScreen,
  StartupScreen,
} from "../../screens/Auth";
import { AuthStackParamList } from "./types";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  const { appColors } = useAppTheme();

  return (
    <Stack.Navigator
      initialRouteName="Startup"
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitle: HeaderTitle,
        headerBackImage: () => (
          <HeaderBackImage tintColor={appColors.primary} />
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
};

export default AuthStack;
