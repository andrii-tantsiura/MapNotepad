import { AppThemes } from "../../../enums";

export interface ISettingsPayload {
  theme?: AppThemes;
  always?: boolean;
}
