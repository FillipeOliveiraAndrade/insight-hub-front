import { COMPANY_STORAGE, COMPANY_STORAGE_TOKEN } from "./storageConfig";

type CompanyType = {
  username: string;
  cnpj: string;
  email: string;
};

type Param = {
  company: CompanyType
  token: string;
}

function storageSaveCompanyAndToken({ company, token }: Param) {
  localStorage.setItem(COMPANY_STORAGE, JSON.stringify(company));
  localStorage.setItem(COMPANY_STORAGE_TOKEN, token);
}

function storageGetCompanyToken() {
  return localStorage.getItem(COMPANY_STORAGE_TOKEN);
}

function storageGetCompany() {
  const company = localStorage.getItem(COMPANY_STORAGE);
  if (company) return JSON.parse(company);
}

export {
  storageSaveCompanyAndToken,
  storageGetCompanyToken,
  storageGetCompany
};
