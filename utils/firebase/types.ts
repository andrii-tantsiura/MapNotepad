export type UnauthorizedError = {
  error: string;
};

export type FirebaseError = {
  error: {
    code: number;
    errors: Array<{ [key: string]: string }>;
    message: string;
  };
};
