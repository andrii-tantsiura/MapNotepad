import { useContext, useEffect, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import FlashMessage from "react-native-flash-message";
import { AuthStack } from "./AuthStack";
import { AuthContext } from "../store/AuthContextProvider";
import colors from "../constants/colors";
import { Loader } from "../components/common";
import { Text, View } from "react-native";

const THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.systemWhite,
  },
};

const AppRoutes: React.FC = () => {
  const [isTryingAuthenticate, setIsTryingAuthenticate] = useState(true);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function tryAuthenticate() {
      await authContext.fetchTokenFromStorageAsync();

      setIsTryingAuthenticate(false);
    }

    tryAuthenticate();
  }, []);

  return isTryingAuthenticate ? (
    <Loader message="Loading..." />
  ) : (
    <>
      <StatusBar style="auto" />
      <FlashMessage position={"bottom"} />
      <NavigationContainer theme={THEME}>
        {authContext.isAuthenticated ? (
          // TODO: replace with HomeStack
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Main Tabbed Page</Text>
          </View>
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    </>
  );
};

export default AppRoutes;
