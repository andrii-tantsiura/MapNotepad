import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

import { ExecuteAsync } from "../helpers/AOResult";
import { IStorageService, Pair } from "../interfaces";

const mapAsync = async <T, U>(items: T[], predicate: (item: T) => U) =>
  Promise.all(items.map(predicate));

class SecureStorage implements IStorageService {
  public multiSetAsync = async (keyValuePairs: Pair<string, string>[]) =>
    ExecuteAsync(async () => {
      await mapAsync(keyValuePairs, ({ key, value }) =>
        setItemAsync(key, value)
      );
    });

  public multiGetAsync = async (keys: string[]) =>
    ExecuteAsync<Pair<string, string | null>[]>(async () => {
      {
        const storedValues = await mapAsync(keys, (x) => getItemAsync(x));

        return storedValues.map((x, index) => ({
          key: keys[index],
          value: x,
        }));
      }
    });

  public multiDeleteAsync = (keys: string[]) =>
    ExecuteAsync(async () => {
      await mapAsync(keys, (x) => deleteItemAsync(x));
    });
}

export default new SecureStorage();
