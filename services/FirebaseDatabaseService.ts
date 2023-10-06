import { get, push, ref, remove, update } from "firebase/database";

import { FirebaseDatabase } from "../FirebaseConfig";
import { firebaseNodesToArray } from "../helpers";
import { ExecuteAsync } from "../helpers/AOResult";
import { IFirebaseRestService } from "../interfaces";
import { IFirebaseNodes } from "../types/api/firebase";
import { AsyncResult } from "../helpers/AOResult/types";

export class FirebaseDatabaseService implements IFirebaseRestService {
  private getReference = (path: string) => ref(FirebaseDatabase, path);

  public getObject = <TResponse>(url: string): AsyncResult<TResponse> =>
    ExecuteAsync<TResponse>(async () => {
      const response = await get(this.getReference(url));

      return response.val() as TResponse;
    });

  public getArray = <TResponse>(url: string): AsyncResult<Array<TResponse>> =>
    ExecuteAsync<Array<TResponse>>(async () => {
      const response = await get(this.getReference(url));

      const firebaseNodes = response.val() as IFirebaseNodes;

      return firebaseNodesToArray(firebaseNodes);
    });

  public delete = (url: string): AsyncResult<void> =>
    ExecuteAsync(async () => remove(this.getReference(url)));

  public post = <TPayload, TResponse>(url: string, payload: TPayload) =>
    ExecuteAsync<TResponse>(async () => {
      const { key } = await push(this.getReference(url), payload);

      return key as TResponse;
    });

  public put = (url: string, payload: any): AsyncResult<void> =>
    ExecuteAsync<void>(() => update(this.getReference(url), payload));
}
