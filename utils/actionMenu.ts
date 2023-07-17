import { RowMap } from "react-native-swipe-list-view";

export const hideActionMenu = (
  rowMap: RowMap<any> | undefined,
  pinKey: string | undefined
) => {
  if (pinKey) {
    rowMap?.[pinKey]?.closeRow();
  }
};
