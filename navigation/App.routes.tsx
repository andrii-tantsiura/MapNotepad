import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import FlashMessage from "react-native-flash-message";

import { LoaderView } from "../components/sections";
import { AppColors } from "../constants";
import { AuthContext } from "../store/AuthContextProvider";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";

const THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: AppColors.systemWhite,
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
    <LoaderView />
  ) : (
    <>
      <StatusBar style="auto" />
      <FlashMessage />
      <NavigationContainer theme={THEME}>
        {authContext.isAuthenticated ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

export default AppRoutes;
