import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import FlashMessage from "react-native-flash-message";

import { LoaderView } from "../components/sections";
import { AppColors } from "../constants";
import { AuthContext } from "../store/AuthProvider";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";

const THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: AppColors.systemWhite,
  },
};

type AppRoutesProps = {
  onReady: () => void;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ onReady }) => {
  const [isTryingAuthenticate, setIsTryingAuthenticate] = useState(true);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function tryAuthenticate() {
      await authContext.fetchCredentialsFromAsyncStorage();

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
      <NavigationContainer theme={THEME} onReady={onReady}>
        {authContext.isAuthenticated ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

export default AppRoutes;
