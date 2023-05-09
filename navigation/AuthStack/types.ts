import { StackScreenProps } from "@react-navigation/stack";

export type AuthStackParams = {
  Startup: undefined;
  RegistrationStartup: undefined;
  RegistrationCompletion: { name: string; email: string };
  Login: { email: string | undefined } | undefined;
};

export type ScreenProps = StackScreenProps<AuthStackParams>;
