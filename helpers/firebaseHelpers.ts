import { IFirebaseNodes } from "../types/api/firebase";
import { AOResult } from "./AOResult";

export const firebaseNodesToArray = <T>(nodes: IFirebaseNodes): Array<T> => {
  const array: T[] = [];

  for (let key in nodes) {
    nodes[key].id = key;

    array.push(nodes[key] as T);
  }

  return array;
};

export const extractErrorMessage = <T>(result: AOResult<T>): string =>
  result.exception?.code ?? result.getMessage();
