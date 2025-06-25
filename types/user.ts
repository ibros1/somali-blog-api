export interface IRegisterUser {
  email: string;
  fullname: string;
  phone_number: string;
  profilePhoto: string;
  coverPhoto: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}
