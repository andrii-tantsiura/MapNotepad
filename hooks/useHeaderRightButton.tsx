import { StackNavigationProp } from "@react-navigation/stack";
import { useLayoutEffect } from "react";
import { ImageProps } from "react-native";

import { IconButton } from "../components/common";
import { HomeStackParamList } from "../navigation/HomeStack/types";
import { scaleSize } from "../utils";
import { useAppTheme } from "./useAppTheme";

export const useHeaderRightButton = <T extends keyof HomeStackParamList>(
  navigation: StackNavigationProp<HomeStackParamList, T>,
  imageSource: ImageProps["source"],
  onPress: () => void
) => {
  const { getColorStyle } = useAppTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          style={{
            margin: scaleSize(12),
          }}
          imageStyle={getColorStyle("tint", "primary")}
          imageSource={imageSource}
          onPress={onPress}
        />
      ),
    });
  }, [navigation]);
};
