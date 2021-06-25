import { storage } from "./utils";
import axios from 'axios';

// interface AuthResponse {
//   user: User;
//   jwt: string;
// }

// export interface User {
//   id: string;
//   email: string;
//   name?: string;
// }

const API_URL = "https://my-server/api";

export async function handleApiResponse(response) {
  const data = await response.json();
  console.log("check data test")
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(data);
  }
}

export async function getUserProfile() {
  console.log("test checj",storage.getToken())
  return  axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: storage.getToken()
    }
  }).then(response=>{
    console.log(response.data);
    handleApiResponse(response);
  }).catch((error) => {
    console.log('error ' + error);
 });;
}

export async function loginWithEmailAndPassword(data) {
  return window
    .fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(handleApiResponse);
}

export async function registerWithEmailAndPassword(
  data
) {
  return window
    .fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then(handleApiResponse);
}
