import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import FlashMessage from "react-native-flash-message";

import { LoaderView } from "../components/sections";
import { AppColors } from "../constants";
import { useFirebaseLogin } from "../hooks";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";

const THEME: Theme = {
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
  const { isLoginInProcess, isAuthenticated } = useFirebaseLogin();

  return isLoginInProcess ? (
    <LoaderView />
  ) : (
    <>
      <StatusBar style="auto" />
      <FlashMessage />
      <NavigationContainer theme={THEME} onReady={onReady}>
        {isAuthenticated ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

export default AppRoutes;
