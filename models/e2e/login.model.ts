export interface UserLoginModel {
  email: string;
  password: string;
  username?: string; // Optional if login can use email only
}

export interface UserSignupModel {
  name: string;
  email: string;
  password?: string; // Optional here if password is handled separately or generated later
}
