import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { IconButton, Typography } from "../../components/common";
import Welcome from "../../pages/Welcome";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import RegisterPassword from "../../pages/RegisterPassword";
import COLORS from "../../constants/colors";
import { RootStackParamList } from "./types";

const LEFT_BLUE = require("../../assets/icons/ic_left_blue.png");

const Stack = createStackNavigator<RootStackParamList>();

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
      component={Welcome}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Register"
      component={Register}
      options={{
        title: "Create an account",
      }}
    />
    <Stack.Screen
      name="RegisterPassword"
      component={RegisterPassword}
      options={{
        title: "Create an account",
      }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        title: "Log in",
      }}
    />
  </Stack.Navigator>
);
