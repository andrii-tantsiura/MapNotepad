import { useEffect, useState } from "react";

import { FirebaseAuth } from "../FirebaseConfig";
import { useAuth } from "./useAuth";

type UseLoginReturn = {
  isAuthenticated: boolean;
  isLoginInProcess: boolean;
};

export const useFirebaseLogin = (): UseLoginReturn => {
  const { isAuthenticated, setCredentials } = useAuth();
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
    isLoginInProcess,
    isAuthenticated,
  };
};
