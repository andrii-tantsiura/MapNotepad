import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

import { IPinModel } from "../../types/models";

export type HomeStackParamList = {
  Tabs: undefined;
  AddPin: undefined;
  EditPin: { pin: IPinModel };
  Settings: undefined;
};

export type HomeScreenProps = StackScreenProps<HomeStackParamList>;

export type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList>;
