import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  username: yup.string().min(3, "O nome deve ter no minimo 3 caracteres").required("Você deve digitar nome"),
  email: yup.string().email("Email inválido").required("Você deve digitar um email"),
  password: yup.string().min(8, "A senha deve ter no minimo 8 caracteres").required("Você deve digitar senha"),
  confirmPassword: yup.string()
     .oneOf([yup.ref("password")], 'A confirmação de senha não corresponde')
     .required("Você deve confirmar sua senha")
});
