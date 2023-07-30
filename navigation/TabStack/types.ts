import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { IPinData } from "../../types/data";

export type TabStackParamList = {
  Map: undefined | { pin: IPinData };
  Pins: undefined;
};

export type TabProps = BottomTabScreenProps<TabStackParamList>;
