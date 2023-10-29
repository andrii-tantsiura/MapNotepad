import { useEffect, useState } from "react";

import { FirebaseAuth } from "../FirebaseConfig";
import { ICredentialsModel } from "../types/models";
import { useAuth } from "./useAuth";

type UseLoginReturn = {
  credentials: ICredentialsModel | null;
  isAuthenticated: boolean;
  isLoginInProcess: boolean;
};

export const useFirebaseAutoLogin = (): UseLoginReturn => {
  const { isAuthenticated, setCredentials, credentials } = useAuth();
  const [isLoginInProcess, setIsLoginInProcess] = useState(true);

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        setCredentials({
          userId: user.uid,
        });
      }

      setIsLoginInProcess(false);
    });

    return unsubscribe;
  }, []);

  return {
    credentials,
    isLoginInProcess,
    isAuthenticated,
  };
};
