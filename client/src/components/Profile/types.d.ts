declare module 'ProfileModel' {
  export type ProfileData = {
    avatar?: string;
    name?: string;
    surname?: string;
    email: string;
    sex?: 'male' | 'female';
    city?: string;
    bithday?: string;
  };

  export type ProfileResponse = {
    status: 'OK';
    statusCode: 200;
    user: ProfileData;
  };
}
