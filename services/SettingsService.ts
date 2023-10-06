import { AppThemes } from "../enums";
import { AsyncResult } from "../helpers/AOResult/types";
import { IFirebaseRestService } from "../interfaces";
import { ISettingsPayload } from "../types/api/firebase";
import { FirebaseDatabaseService } from "./FirebaseDatabaseService";

export class SettingsService {
  private _database: IFirebaseRestService;
  private _pathToSettings: string;

  constructor(userId: string) {
    this._database = new FirebaseDatabaseService();
    this._pathToSettings = `settings/${userId}`;
  }

  public getAppTheme = (): AsyncResult<AppThemes> =>
    this._database.getObject<AppThemes>(this._pathToSettings + "/theme");

  public updateAppTheme = async (theme: AppThemes): AsyncResult<void> => {
    const payload: ISettingsPayload = {
      theme: theme,
    };

    return this._database.put(this._pathToSettings, payload);
  };
}
