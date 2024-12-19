import { api } from "../api"
// import { UserRegisterFormDataProps } from "../../interfaces/users/users";

const loginCompany = async (endpoint: string, body) => api.post(endpoint, body); 
const registerCompany = async (endpoint: string, body) => api.post(endpoint, body); 

const createProduct = async (endpoint: string, body: FormData, token: string) => {
  return api.post(endpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getProductsOfCompany = async (endpoint: string, token: string) => {
  return api.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export {
  loginCompany,
  registerCompany,
  createProduct,
  getProductsOfCompany
};
