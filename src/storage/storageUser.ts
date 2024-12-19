import { USER_STORAGE, USER_STORAGE_TOKEN } from "./storageConfig";

type UserType = {
  username: string;
  email: string;
};

type Param = {
  user: UserType
  token: string;
}

function storageSaveUserAndToken({ user, token }: Param) {
  localStorage.setItem(USER_STORAGE, JSON.stringify(user))
  localStorage.setItem(USER_STORAGE_TOKEN, token);
}

function storageGetUserToken() {
  return localStorage.getItem(USER_STORAGE);
}

function storageGetUser() {
  return localStorage.getItem(USER_STORAGE);
}

export {
  storageSaveUserAndToken,
  storageGetUserToken,
  storageGetUser
};
