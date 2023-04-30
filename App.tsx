import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";

import {
  BOLD_FONT_FAMILY,
  MEDIUM_FONT_FAMILY,
  REGULAR_FONT_FAMILY,
  SEMI_BOLD_FONT_FAMILY,
} from "./constants/fontWeights";
import colors from "./constants/colors";
import StartScreen from "./pages/StartScreen";
import RegisterScreen from "./pages/RegisterScreen";
import { Typography, IconButton } from "./components/common";
import { headerStyle } from "./constants/styles";
import LoginScreen from "./pages/LoginScreen";
import { iconSizes } from "./constants/sizes";

const LEFT_BLUE = require("./assets/icons/ic_left_blue.png");

const AuthStack = createStackNavigator();

const THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.systemWhite,
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    [BOLD_FONT_FAMILY]: require("./assets/fonts/Montserrat-Bold.ttf"),
    [SEMI_BOLD_FONT_FAMILY]: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    [MEDIUM_FONT_FAMILY]: require("./assets/fonts/Montserrat-Medium.ttf"),
    [REGULAR_FONT_FAMILY]: require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  // TODO: add loader or splash screen
  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer theme={THEME}>
        <AuthStack.Navigator initialRouteName="StartScreen">
          <AuthStack.Group
            screenOptions={({ navigation }) => ({
              headerTitleAlign: "center",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: colors.systemWhite,
              },
              headerTitle: ({ children }) => (
                <Typography {...headerStyle}>{children}</Typography>
              ),
              headerLeft: () => (
                <IconButton
                  marginLeft={8}
                  {...iconSizes.i24}
                  source={LEFT_BLUE}
                  onPress={navigation.goBack}
                />
              ),
            })}
          >
            <AuthStack.Screen
              name="Start"
              component={StartScreen}
              options={{
                headerShown: false,
              }}
            />

            <AuthStack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                title: "Create an account",
              }}
            />

            <AuthStack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: "Log in",
              }}
            />
          </AuthStack.Group>
        </AuthStack.Navigator>
      </NavigationContainer>
    </>
  );
}
