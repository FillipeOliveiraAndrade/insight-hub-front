import { api } from "../api";

const getProducts = async (endpoint) => api.get(endpoint);
const getProductsOfCompany = async (endpoint) => api.get(endpoint);

export {
  getProducts,
  getProductsOfCompany
};
