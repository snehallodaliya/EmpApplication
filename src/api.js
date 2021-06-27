import { storage } from "./utils";
import axios from 'axios';
import { response } from "msw";

// interface AuthResponse {
//   user: User;
//   jwt: string;
// }

// export interface User {
//   id: string;
//   email: string;
//   name?: string;
// }

const API_URL = "http://localhost:3000/admin";

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
  if(storage.getToken()!== null && storage.getToken() !== undefined&& storage.getToken().length>0){
    return  axios.get(`${API_URL}/user/60d69f9ad1228812f244aaae`, {
      headers: {
        Authorization: storage.getToken()
      }
    }).then(response=>{
      console.log(response.data);
      handleApiResponse(response);
    }).catch((error) => {
      console.log('error ' + error);
   });
  }else{
    return;
  }
  
}

export async function loginWithEmailAndPassword(data) {
  return await axios.post(`${API_URL}/auth/login`, data)
    
}

export async function registerWithEmailAndPassword(
  data
) {
  return await axios.post(`${API_URL}/auth/register`,data)
    // .then(response=>{
    //   response.json();
    // }).then(data=>{
    //   return response.DATA;
    // });
}
