import { ReactNode } from "react";
import { Typography } from "../../common";

interface IHeaderTitleProps {
  children: ReactNode;
}

export const HeaderTitle: React.FC<IHeaderTitleProps> = ({ children }) => (
  <Typography size="i16" weight="semiBold" color="systemBlack">
    {children}
  </Typography>
);
