import { ValidationErrorMessages } from "../../enums";
import { RulesType } from "./validationRules";

export const getConfirmPasswordRules = (
  comparedPassword: string
): RulesType => ({
  required: ValidationErrorMessages.REQUIRED,
  validate: (value) =>
    value === comparedPassword || ValidationErrorMessages.PASSWORD_MISMATCH,
});
