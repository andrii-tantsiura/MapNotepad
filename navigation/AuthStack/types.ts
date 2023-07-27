import { StackScreenProps } from "@react-navigation/stack";

export type AuthStackParamList = {
  Startup: undefined;
  RegistrationStartup: undefined;
  RegistrationCompletion: { name: string; email: string };
  Login: undefined | { email: string };
};

export type AuthScreenProps = StackScreenProps<AuthStackParamList>;
