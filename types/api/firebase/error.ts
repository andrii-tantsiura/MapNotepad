export type UnauthorizedResponseError = {
  error: string;
};

export type ResponseError = {
  error: {
    code: number;
    errors: Array<{ [key: string]: string }>;
    message: string;
  };
};
