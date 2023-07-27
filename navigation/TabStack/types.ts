import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { IPin } from "../../types";

export type TabStackParamList = {
  Map: undefined | { pin: IPin };
  Pins: undefined;
};

export type TabProps = BottomTabScreenProps<TabStackParamList>;
