export interface UserLoginFormDataProps {
  email: string;
  password: string;
};

export interface UserRegisterFormDataProps extends UserLoginFormDataProps {
  username: string;
  confirmPassword: string;
};