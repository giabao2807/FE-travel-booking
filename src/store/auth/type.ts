export type IUser = {
  name: string;
  email: string;
  role: string;
  photo: string;
  accessToken: string
  _id: string;
  id: string;
  created_at: string;
  updated_at: string;
  __v: number;
}


export type GenericResponse = {
  status: string;
  message: string;
}

export type ISignInInput = {
  username: string;
  password: string;
}


export type ISignUpInput = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export type ILoginResponse = {
  status: string;
  accessToken: string;
}

export type ISignUpResponse = {
  status: string;
  message: string;
}

export type IUserResponse = {
  status: string;
  data:{
    user: IUser;
  };
}