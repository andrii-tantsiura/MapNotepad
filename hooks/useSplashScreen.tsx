import * as SplashScreen from "expo-splash-screen";
import React, {
  FC,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

type ISplashScreenWrapperProps = {
  children: ReactNode;
};

type UseSplashScreenReturn = {
  onContentReady: () => void;
  SplashScreenContainer: FC<ISplashScreenWrapperProps>;
};

export const useSplashScreen = (
  canHideSplashScreen: boolean
): UseSplashScreenReturn => {
  const [isContentReady, setIsContentReady] = useState(false);

  const onContentReady = useCallback(async () => {
    if (canHideSplashScreen) {
      await SplashScreen.hideAsync();
    }
  }, [canHideSplashScreen]);

  const SplashScreenContainer: FC<ISplashScreenWrapperProps> = memo(
    ({ children }) => <>{isContentReady ? children : null}</>
  );

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    setIsContentReady(canHideSplashScreen);
  }, [canHideSplashScreen]);

  return { SplashScreenContainer, onContentReady };
};
