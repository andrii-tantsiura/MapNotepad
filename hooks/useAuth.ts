import { useCallback } from "react";
import { useSelector } from "react-redux";

import { FirebaseAuth } from "../FirebaseConfig";
import { loginAction, logoutAction } from "../store/redux/actions";
import { selectAuth } from "../store/redux/slices";
import { useAppDispatch } from "../store/redux/store";
import { ICredentialsModel } from "../types/models";

type UseAuthReturn = {
  credentials: ICredentialsModel | null;
  isAuthenticated: boolean;
  setCredentials: (credentials: ICredentialsModel) => void;
  signOut: () => Promise<void>;
};

export const useAuth = (): UseAuthReturn => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, credentials } = useSelector(selectAuth);

  const setCredentials = useCallback(
    (credentials: ICredentialsModel) => dispatch(loginAction(credentials)),
    []
  );

  const signOut = useCallback(async (): Promise<void> => {
    await FirebaseAuth.signOut();

    dispatch(logoutAction());
  }, []);

  return {
    credentials,
    isAuthenticated,
    setCredentials,
    signOut,
  };
};
