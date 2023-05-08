import { useContext, useEffect, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import FlashMessage from "react-native-flash-message";
import AuthStack from "./AuthStack";
import { AuthContext } from "../store/AuthContextProvider";
import COLORS from "../constants/colors";
import { Loader } from "../components/common";
import { Text, View } from "react-native";
import TabsStack from "./TabStack";

const THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.systemWhite,
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
    <Loader />
  ) : (
    <>
      <StatusBar style="auto" />
      <FlashMessage />
      <NavigationContainer theme={THEME}>
        {authContext.isAuthenticated ? <TabsStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

export default AppRoutes;
