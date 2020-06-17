declare module 'SignInModel' {
  export type LoginRequest = {
    email: string;
    password: string;
  };

  export type LoginResponse = {
    status: 'OK';
    statusCode: number;
    message: string;
    token: string;
  };

  export type Token = null | string;
}
