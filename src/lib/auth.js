import { initReactQueryAuth } from "react-query-auth";
import {
  getUserProfile,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword
  
} from "../api";
import { storage } from "../utils";

export async function handleUserResponse(data) {
  console.log("test data",data)
  const { jwt, user } = data;
  storage.setToken(jwt);
  return user;
}

async function loadUser() {
  let user = null;

  if (storage.getToken()) {
    const data = await getUserProfile();
    user = data;
  }
  return user;
}

async function loginFn(data) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  await storage.clearToken();
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn
};

const { AuthProvider, useAuth } = initReactQueryAuth(authConfig);

export { AuthProvider, useAuth };
