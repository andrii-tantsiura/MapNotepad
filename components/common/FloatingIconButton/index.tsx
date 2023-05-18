import { FC } from "react";
import { IIconButtonProps, IconButton } from "../../common/IconButton";
import styles from "./styles";

export const FloatingIconButton: FC<IIconButtonProps> = ({
  source,
  style,
  ...props
}) => (
  <IconButton style={[styles.container, style]} source={source} {...props} />
);
