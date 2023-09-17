import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

import { ExecuteAsync } from "../helpers/AOResult";
import { IStorage, Pair } from "../interfaces";

class SecureStorage implements IStorage {
  public setAsync = async (key: string, value: string) =>
    ExecuteAsync(() => setItemAsync(key, value));

  public multiSetAsync = async (keyValuePairs: Pair<string, string>[]) =>
    ExecuteAsync(async () => {
      const tasks = keyValuePairs.map(({ key, value }) =>
        setItemAsync(key, value)
      );

      await Promise.all(tasks);
    });

  public multiGetAsync = async (keys: string[]) =>
    ExecuteAsync<Pair<string, string | null>[]>(async () => {
      {
        const tasks = keys.map((x) => getItemAsync(x));
        const result = await Promise.all(tasks);

        return result.map((x, index) => ({
          key: keys[index],
          value: x,
        }));
      }
    });

  public getAsync = async (key: string) =>
    ExecuteAsync<string | null>(() => getItemAsync(key));

  public deleteAsync = (key: string) =>
    ExecuteAsync(() => deleteItemAsync(key));
}

export default new SecureStorage();
