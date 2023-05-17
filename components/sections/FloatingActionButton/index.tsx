import { FC } from "react";
import { IIconButtonProps, IconButton } from "../../common";
import styles from "./styles";

export const FloatingActionButton: FC<IIconButtonProps> = ({
  source,
  style,
  ...props
}) => (
  <IconButton style={[styles.container, style]} source={source} {...props} />
);
