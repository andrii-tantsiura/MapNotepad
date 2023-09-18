import { AsyncResult } from "../helpers/AOResult/types";

export type Pair<T, U> = {
  key: T;
  value: U;
};

export interface IStorageService {
  multiSetAsync: (keyValuePairs: Pair<string, string>[]) => AsyncResult<void>;
  multiGetAsync: (keys: string[]) => AsyncResult<Pair<string, string | null>[]>;
  multiDeleteAsync: (keys: string[]) => AsyncResult<void>;
}
