import { useSelector } from "react-redux";

import { selectSettings } from "../store/redux/slices/settingsSlice";

export const useAppTheme = () => {
  const { appTheme, appColors } = useSelector(selectSettings);

  return { appTheme, appColors };
};
