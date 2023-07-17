import { StackScreenProps } from "@react-navigation/stack";

export type AuthStackParamList = {
  Startup: undefined;
  RegistrationStartup: undefined;
  RegistrationCompletion: { name: string; email: string };
  Login: { email: string } | undefined;
};

export type AuthScreenProps = StackScreenProps<AuthStackParamList>;
