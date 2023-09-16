import { StackScreenProps } from "@react-navigation/stack";

import { IPinModel } from "../../types/models";

export type HomeStackParamList = {
  Tabs: undefined;
  AddPin: undefined;
  EditPin: { pin: IPinModel };
};

export type HomeScreenProps = StackScreenProps<HomeStackParamList>;
