import { AsyncResult } from "../helpers/AOResult/types";

export type Pair<T, U> = {
  key: T;
  value: U;
};

export interface IStorage {
  setAsync: (key: string, value: string) => AsyncResult<void>;
  multiSetAsync: (keyValuePairs: Pair<string, string>[]) => AsyncResult<void>;
  getAsync: (key: string) => AsyncResult<string | null>;
  multiGetAsync: (keys: string[]) => AsyncResult<Pair<string, string | null>[]>;
  deleteAsync: (key: string) => AsyncResult<void>;
}
