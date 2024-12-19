import { api } from "../api"
// import { UserRegisterFormDataProps } from "../../interfaces/users/users";

const loginUser = async (endpoint: string, body) => api.post(endpoint, body); 
const registerUser = async (endpoint: string, body) => api.post(endpoint, body);

export {
  registerUser,
  loginUser
};
