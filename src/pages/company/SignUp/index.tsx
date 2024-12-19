import { useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  User,
  EnvelopeSimple,
  BuildingOffice,
  LockSimple,
  ArrowLeft,
} from "@phosphor-icons/react";

import InputIcon from "../../../components/InputIcon/InputIcon";
import { signUpSchema } from "../../../schemas/company/signUpSchema";
import { CompanyRegisterFormDataProps } from "../../../interfaces/company";
import { registerCompany } from "../../../api/company/company";

import companyImageRegister from "../../../assets/companyImageRegister.png";

import "./styles.css";

function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageError, setMessageError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyRegisterFormDataProps>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      cnpj: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: CompanyRegisterFormDataProps) => {
    const {
      username,
      cnpj,
      email,
      password
    } = data;

    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

    if (!cnpjRegex.test(cnpj)) {
      return setMessageError("O CNPJ deve estar no seguindo formato: XX.XXX.XXX/XXXX-XX");
    }
    
    try {
      await registerCompany("/company", { username, email, password, cnpj });
      setIsSubmitting(true);
      setTimeout(() => navigate("/company/signin"), 2000);
    } catch (error) {     
      if (error instanceof AxiosError && error.response) {
        return setMessageError(error.response.data.message);
      }

      setMessageError("Algo deu errado, tente novamente mais tarde!");
    } finally {
      reset();
    }
  };

  return (
    <div className="container-company-signup">
      <img src={companyImageRegister} width="350px" />

      <div>
        <h1 className="company-title-signup"> Criando conta </h1>

        <form className="company-form-signup" onSubmit={handleSubmit(onSubmit)}>
          <InputIcon
            Icon={User}
            className="company-input-signup"
            placeholder="Nome da empresa"
            {...register("username")}
          />
          <p className="company-messageErrorInputs-signup">{errors.username?.message}</p>

          <InputIcon
            Icon={BuildingOffice}
            className="company-input-signup"
            placeholder="CNPJ"
            {...register("cnpj")}
          />
          <p className="company-messageErrorInputs-signup">{errors.cnpj?.message}</p>

          <InputIcon
            Icon={EnvelopeSimple}
            className="company-input-signup"
            placeholder="email@gmail.com (opcional)"
            type="email"
            {...register("email")}
          />
          <p className="company-messageErrorInputs-signup">{errors.email?.message}</p>

          <InputIcon
            Icon={LockSimple}
            className="company-input-signup"
            placeholder="Senha"
            type="password"
            {...register("password")}
          />
          <p className="company-messageErrorInputs-signup">{errors.password?.message}</p>

          <InputIcon
            Icon={LockSimple}
            className="company-input-signup"
            placeholder="Confirmar senha"
            type="password"
            {...register("confirmPassword")}
          />
          <p className="company-messageErrorInputs-signup">{errors.confirmPassword?.message}</p>

          <p className="company-messageErrorApi-signup">{ messageError }</p>
          <div className="company-buttons-signup">
            <a className="company-link-signup" href="/company/signin">
              <ArrowLeft /> Logar
            </a>

            <button className="company-button-signup" type="submit" disabled={isSubmitting}>
              { isSubmitting ? "Criando..." : "Criar conta" }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
