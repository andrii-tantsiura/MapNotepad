import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { IPinModel } from "../../types/models";

export type TabStackParamList = {
  Map: undefined | { pin: IPinModel };
  Pins: undefined;
};

export type TabProps = BottomTabScreenProps<TabStackParamList>;
