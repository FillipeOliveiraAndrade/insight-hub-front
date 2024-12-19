import { useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BuildingOffice, LockSimple, ArrowRight } from "@phosphor-icons/react";

import InputIcon from "../../../components/InputIcon/InputIcon";

import { signInSchema } from "../../../schemas/company/signInSchema";
import { CompanyLoginFormDataProps } from "../../../interfaces/company";
import { loginCompany } from "../../../api/company/company";

import companyImageLogin from "../../../assets/companyImageLogin.png";

import "./styles.css";
import { storageSaveCompanyAndToken } from "../../../storage/storageCompany";

function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageError, setMessageError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyLoginFormDataProps>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      cnpj: "",
      password: "",
    },
  });

  async function onSubmit(data: CompanyLoginFormDataProps) {
    const { email, cnpj, password } = data;

    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

    if (!cnpjRegex.test(cnpj)) {
      return setMessageError("O CNPJ deve estar no seguindo formato: XX.XXX.XXX/XXXX-XX");
    }

    try {
      const { data } = await loginCompany("/auth/company", { email, password, cnpj });
      
      storageSaveCompanyAndToken(data);
      setIsSubmitting(true);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {     
      if (error instanceof AxiosError && error.response) {
        return setMessageError(error.response.data.message);
      }

      setMessageError("Algo deu errado, tente novamente mais tarde!");
    } finally {
      reset();
    }
  }

  return (
    <div className="container-company-signin">
      <div>
        <h1 className="company-title-signin"> Bem-vindo de volta </h1>

        <form className="company-form-signin" onSubmit={handleSubmit(onSubmit)}>
          <InputIcon
            Icon={BuildingOffice}
            className="company-input-signin"
            placeholder="CNPJ"
            autoComplete="off"
            {...register("cnpj")}
          />
          <p className="company-messageErrorInputs-signup">{errors.cnpj?.message}</p>

          <InputIcon
            Icon={LockSimple}
            className="company-input-signin"
            placeholder="Digite sua senha"
            type="password"
            autoComplete="off"
            {...register("password")}
          />
          <p className="company-messageErrorInputs-signup">{errors.password?.message}</p>

          <p className="company-messageErrorApi-signup">{ messageError }</p>
          <div className="company-buttons-signin">
            <button className="company-button-signin" type="submit">
            { isSubmitting ? "Entrando..." : "Entrar" }
            </button>

            <a className="company-link-signin" href="/company/signup">
              Criar conta
              {" "}
              <ArrowRight />
            </a>
          </div>
        </form>
      </div>

      <img src={companyImageLogin} width="350px" />
    </div>
  );
}

export default SignIn;
