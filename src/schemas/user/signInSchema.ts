import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Você deve digitar um email"),
  password: yup.string().min(8, "A senha deve ter no minimo 8 caracteres").required("Você deve digitar senha"),
});
