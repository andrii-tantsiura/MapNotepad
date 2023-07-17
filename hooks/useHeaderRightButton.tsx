import { StackNavigationProp } from "@react-navigation/stack";
import { useLayoutEffect } from "react";
import { ImageProps } from "react-native";

import { CustomButton } from "../components/common";
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
        <CustomButton
          imageSource={imageSource}
          onPress={onPress}
          containerStyle={{
            margin: scaleSize(12),
          }}
        />
      ),
    });
  }, [navigation]);
};
