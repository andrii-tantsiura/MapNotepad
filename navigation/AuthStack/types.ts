import { StackScreenProps } from "@react-navigation/stack";

export type AuthStackParams = {
  Welcome: undefined;
  Register: undefined;
  RegisterPassword: { name: string; email: string };
  Login: { email: string | undefined } | undefined;
};

export type ScreenProps = StackScreenProps<AuthStackParams>;
