import { Menu } from "native-base";
import React, { FC, ReactNode } from "react";
import {
  Image,
  ImageProps,
  Pressable,
  PressableProps,
  View,
} from "react-native";

import { textStyle_i14 } from "../../../constants";
import { useAppTheme } from "../../../hooks";
import { Typography } from "../Typography";
import styles from "./styles";

export interface ContextMenuOption {
  text: string;
  imageSource: ImageProps["source"];
  onPress: () => void;
}

type ContextMenuProps = {
  items: ContextMenuOption[];
  triggerComponent: ReactNode;
  offsetY: number;
  offsetX: number;
};

export const ContextMenu: FC<ContextMenuProps> = ({
  triggerComponent,
  items,
  offsetY,
  offsetX,
}) => {
  const { appColors } = useAppTheme();

  return (
    <Menu
      style={[styles.menuContainer, { backgroundColor: appColors.variant }]}
      crossOffset={offsetX}
      offset={offsetY}
      placement="bottom right"
      trigger={(
        triggerProps: JSX.IntrinsicAttributes &
          PressableProps &
          React.RefAttributes<View>
      ) => {
        return (
          <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            {triggerComponent}
          </Pressable>
        );
      }}
    >
      {items.map((x) => (
        <Menu.Item
          key={x.text}
          style={styles.itemContainer}
          onPress={x.onPress}
        >
          <Typography style={[textStyle_i14, styles.itemText]}>
            {x.text}
          </Typography>

          <Image style={styles.itemImage} source={x.imageSource} />
        </Menu.Item>
      ))}
    </Menu>
  );
};
