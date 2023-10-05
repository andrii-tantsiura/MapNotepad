import { get, push, ref, remove, update } from "firebase/database";

import { FirebaseDatabase } from "../FirebaseConfig";
import { firebaseNodesToArray } from "../helpers";
import { ExecuteAsync } from "../helpers/AOResult";
import { IFirebaseRestService } from "../interfaces";
import { IFirebaseNodes } from "../types/api/firebase";

export class FirebaseDatabaseService implements IFirebaseRestService {
  private getReference = (path: string) => ref(FirebaseDatabase, path);

  public get = <TResponse>(url: string) =>
    ExecuteAsync<Array<TResponse>>(async () => {
      const response = await get(this.getReference(url));

      const firebaseNodes = response.val() as IFirebaseNodes;

      return firebaseNodesToArray(firebaseNodes);
    });

  public delete = (url: string) =>
    ExecuteAsync(async () => remove(this.getReference(url)));

  public post = <TPayload, TResponse>(url: string, payload: TPayload) =>
    ExecuteAsync<TResponse>(async () => {
      const { key } = await push(this.getReference(url), payload);

      return key as TResponse;
    });

  public put = (url: string, payload: any) =>
    ExecuteAsync<void>(() => update(this.getReference(url), payload));
}
