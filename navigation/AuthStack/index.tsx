import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { IconButton, Typography } from "../../components/common";
import WelcomeScreen from "../../pages/WelcomeScreen";
import LoginScreen from "../../pages/LoginScreen";
import RegisterScreen from "../../pages/RegisterScreen";
import RegisterPasswordScreen from "../../pages/RegisterPasswordScreen";
import COLORS from "../../constants/colors";
import { AuthStackParams } from "./types";

const LEFT_BLUE = require("../../assets/icons/ic_left_blue.png");

const Stack = createStackNavigator<AuthStackParams>();

export const AuthStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Welcome"
    screenOptions={({ navigation }) => ({
      headerShadowVisible: false,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: COLORS.systemWhite,
      },
      headerTitle: ({ children }) => (
        <Typography size="i16" weight="semiBold" color="systemBlack">
          {children}
        </Typography>
      ),
      headerLeft: () => (
        <IconButton
          style={{ marginLeft: 8 }}
          source={LEFT_BLUE}
          onPress={navigation.goBack}
        />
      ),
    })}
  >
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{
        title: "Create an account",
      }}
    />
    <Stack.Screen
      name="RegisterPassword"
      component={RegisterPasswordScreen}
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
