import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Welcome: undefined;
  Register: undefined;
  RegisterPassword: { name: string; email: string };
  Login: { email: string | undefined } | undefined;
};

export type Props = StackScreenProps<RootStackParamList>;
