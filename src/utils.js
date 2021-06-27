const test=()=>{

  if (localStorage.getItem('token') !== null) {
    return localStorage.getItem("token");
  }
  return;
  
}
const storage = {
    getToken: () => test(),
    setToken: (token) =>
      localStorage.setItem("token", token),
    clearToken: () => localStorage.removeItem("token")
  };
  export { storage};
  