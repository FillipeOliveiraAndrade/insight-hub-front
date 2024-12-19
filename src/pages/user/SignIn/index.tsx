import { useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EnvelopeSimple, LockSimple } from "@phosphor-icons/react";

import { signInSchema } from "../../../schemas/user/signInSchema";
import { UserLoginFormDataProps } from "../../../interfaces/users";
import { storageSaveUserAndToken } from "../../../storage/storageUser";
import { loginUser } from "../../../api/users/user";

import InputIcon from "../../../components/InputIcon/InputIcon";

import loginSvg from "../../../assets/loginSvg.svg";
import "./styles.css";

function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageError, setMessageError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLoginFormDataProps>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const navigate = useNavigate();

  const onSubmit = async (data: UserLoginFormDataProps) => {
    const { email, password } = data;

    try {
      const { data } = await loginUser("/auth/user", { email, password });
      storageSaveUserAndToken(data);
      setIsSubmitting(true);
      setTimeout(() => navigate("/catalog"), 2000);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setMessageError(error.response.data.message);
      }

      setMessageError("Algo deu errado, tente novamente mais tarde!");
    } finally {
      reset();
    }
  };

  return (
    <div className="container">
      <div>
        <h1 className="title"> Bem-vindo de volta </h1>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <InputIcon
            Icon={EnvelopeSimple}
            placeholder="email@gmail.com"
          {...register("email")}
          />
          <p className="messageErrorInputs-signin">{errors.email?.message}</p>

          <InputIcon
            Icon={LockSimple}
            placeholder="entre com sua senha"
            {...register("password")}
          />
          <p className="messageErrorInputs-signin">{errors.password?.message}</p>

          <p className="messageErrorApi-signin">{ messageError }</p>
          <button className="button-user-signin" type="submit" disabled={isSubmitting}>
            { isSubmitting ? "Entrando..." : "Entrar" }
          </button>
        </form>

        <p className="text">
          Não tem uma conta?
          {" "}
          <a className="signup-link" onClick={() => navigate('/user/signup')}>Registre-se</a>
        </p>
      </div>

      <div className="contain"></div>
      <img src={loginSvg} height="350px" width="310px" className="image-login" />
    </div>
  );
}

export default SignIn;
