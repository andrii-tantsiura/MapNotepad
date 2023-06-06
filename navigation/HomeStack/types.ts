import { StackScreenProps } from "@react-navigation/stack";

export type HomeStackParamList = {
  Tabs: undefined;
  AddPin: undefined;
  EditPin: { pinId: string };
};

export type HomeScreenProps = StackScreenProps<HomeStackParamList>;
