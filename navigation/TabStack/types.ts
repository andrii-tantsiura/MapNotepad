import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type TabStackParamList = {
  Map: undefined;
  Pins: undefined;
};

export type TabProps = BottomTabScreenProps<TabStackParamList>;
