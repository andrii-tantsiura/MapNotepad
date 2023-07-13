export const FIREBASE_API_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:";

export const FIREBASE_API_KEY = "AIzaSyDNrzSTY0ZRPpfmSzqgMWl95weevrmh-cw";

export const LOGIN_WITH_EMAIL_URL =
  FIREBASE_API_URL + "signInWithPassword?key=" + FIREBASE_API_KEY;

export const REGISTER_WITH_EMAIL_URL =
  FIREBASE_API_URL + "signUp?key=" + FIREBASE_API_KEY;
