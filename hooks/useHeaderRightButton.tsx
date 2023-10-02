import { StackNavigationProp } from "@react-navigation/stack";
import { useLayoutEffect } from "react";
import { ImageProps } from "react-native";

import { IconButton } from "../components/common/IconButton";
import { HomeStackParamList } from "../navigation/HomeStack/types";
import { scaleSize } from "../utils";

export const useHeaderRightButton = <T extends keyof HomeStackParamList>(
  navigation: StackNavigationProp<HomeStackParamList, T>,
  imageSource: ImageProps["source"],
  onPress: () => void
) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          style={{
            margin: scaleSize(12),
          }}
          tintColor="primary"
          imageSource={imageSource}
          onPress={onPress}
        />
      ),
    });
  }, [navigation]);
};
