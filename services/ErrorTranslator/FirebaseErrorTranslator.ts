import { FirebaseErrorMessages } from "../../enums";
import { BaseErrorTranslator } from "./BaseErrorTranslator";

class FirebaseErrorTranslator extends BaseErrorTranslator {
  constructor() {
    const mapper: Record<string, string> = {
      [FirebaseErrorMessages.USER_NOT_FOUND]: "User not found",
      [FirebaseErrorMessages.EMAIL_ALREADY_IN_USE]: "Email already in use",
      [FirebaseErrorMessages.INVALID_PASSWORD]: "Invalid password",
      [FirebaseErrorMessages.WRONG_PASSWORD]: "Wrong password",

      [FirebaseErrorMessages.INVALID_ID_TOKEN]: "Invalid token",
      [FirebaseErrorMessages.ID_TOKEN_EXPIRED]: "Token expired",
      [FirebaseErrorMessages.ID_TOKEN_REVOKED]: "Token revoked",

      [FirebaseErrorMessages.OPERATION_NOT_ALLOWED]: "Operation not allowed",
      [FirebaseErrorMessages.INTERNAL_ERROR]: "Internal error",
      [FirebaseErrorMessages.TOO_MANY_REQUESTS]: "Too many requests",
      [FirebaseErrorMessages.NETWORK_REQUEST_FAILED]: "Network request failed",
    };

    super(mapper, Object.values(FirebaseErrorMessages));
  }
}

export default new FirebaseErrorTranslator();
