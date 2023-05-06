export type IAuthResponse = {
  full_name: string;
  email: string;
  role: string;
  avatar: string;
  accessToken: string,
  refreshToken: string
}


export type GenericResponse = {
  status: string;
  message: string;
}

export type ISignInInput = {
  email: string;
  password: string;
}


export type ISignUpInput = {
  lastName: string;
  firstName: string;
  gender: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

export type ILoginResponse = {
  status: string;
  accessToken: string;
}

export type ISignUpResponse = {
  status: string;
  message: string;
}
