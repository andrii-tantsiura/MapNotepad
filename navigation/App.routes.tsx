import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import FlashMessage from "react-native-flash-message";

import {
  useAppTheme,
  useFirebaseAutoLogin,
  usePins,
  useSettings,
} from "../hooks";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";

type AppRoutesProps = {
  onReady: () => void;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ onReady }) => {
  const { isAuthenticated, credentials } = useFirebaseAutoLogin();
  const { theme, statusBarStyle } = useAppTheme();
  const { fetchSettings } = useSettings();
  const { fetchPins } = usePins();

  useEffect(() => {
    fetchSettings().then(onReady);
    fetchPins();
  }, [credentials]);

  return (
    <>
      <StatusBar style={statusBarStyle} />
      <FlashMessage />
      <NavigationContainer theme={theme}>
        {isAuthenticated ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

export default AppRoutes;
