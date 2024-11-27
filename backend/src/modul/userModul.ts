export type createUser = {
  username: string;
  email: string;
  password: string;
  token?: string;
};

export type loginUser = {
  email: string;
  password: string;
};

export type responseUser = {
  username: string;
  email: string;
};

export function toUserResponse(user: any): responseUser {
  return {
    username: user.username,
    email: user.email,
  };
}
