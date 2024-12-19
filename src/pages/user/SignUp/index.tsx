import { useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User, EnvelopeSimple, LockSimple } from "@phosphor-icons/react";

import { UserRegisterFormDataProps } from "../../../interfaces/users";
import { registerUser } from "../../../api/users/user";
import { signUpSchema } from "../../../schemas/user/signUpSchema";

import InputIcon from "../../../components/InputIcon/InputIcon";

import registerSvg from "../../../assets/registerSvg.svg";
import "./styles.css";

function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageError, setMessageError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserRegisterFormDataProps>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const navigate = useNavigate();

  const onSubmit = async (data: UserRegisterFormDataProps) => {
    const { username, email, password } = data;
  
    try {
      await registerUser("/user", { username, email, password });
      setIsSubmitting(true);
      setTimeout(() => navigate("/user/signin"), 2000);
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
    <div className="container-signup">
      <div className="contain-signup"></div>
      <img
        src={registerSvg}
        height="450px"
        width="450px"
        className="image-register"
      />

      <div>
        <h1 className="title-signup"> Criando a conta </h1>

        <form className="form-signup" onSubmit={handleSubmit(onSubmit)}>
          <InputIcon
            Icon={User}
            placeholder="username"
            {...register("username")}
          />
          <p className="messageErrorInputs-signup">{errors.username?.message}</p>

          <InputIcon
            Icon={EnvelopeSimple}
            placeholder="email@gmail.com"
            {...register("email")}
          />
          <p className="messageErrorInputs-signup">{errors.email?.message}</p>

          <InputIcon
            Icon={LockSimple}
            placeholder="digite uma senha"
            type="password"
            {...register("password")}
          />
          <p className="messageErrorInputs-signup">{errors.password?.message}</p>

          <InputIcon
            Icon={LockSimple}
            placeholder="confirme sua senha"
            type="password"
            {...register("confirmPassword")}
          />
          <p className="messageErrorInputs-signup">{errors.confirmPassword?.message}</p>

          <p className="messageErrorApi-signup">{ messageError }</p>
          <button className="button-signup" type="submit" disabled={isSubmitting}>
            { isSubmitting ? "Criando..." : "Criar conta" }
          </button>
        </form>

        <p className="text-signup">
          Já possui uma conta?
          {" "}
          <a className="signin-link" onClick={() => navigate("/user/signin")}>
            Logar
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
