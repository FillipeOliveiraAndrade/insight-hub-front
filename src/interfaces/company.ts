export interface CompanyLoginFormDataProps {
  email?: string;
  password: string;
  cnpj: string;
};

export interface CompanyRegisterFormDataProps extends CompanyLoginFormDataProps {
  username: string;
  confirmPassword: string;
};